(function (global) {
  const App = global.TimetableApp = global.TimetableApp || {};

  function scoreCandidate(state, candidate) {
    const warnings = [];
    const improvements = [];
    const breakdown = {
      sameDaySubject: 0,
      teacherGaps: 0,
      teacherConsecutive: 0,
      classDailyLoad: 0,
      specialRoomSpread: 0,
      doublePreferred: 0
    };

    scoreSameDaySubjects(state, candidate, breakdown, warnings, improvements);
    scoreTeacherLoad(state, candidate, breakdown, warnings, improvements);
    scoreClassDailyLoad(state, candidate, breakdown, warnings, improvements);
    scoreSpecialRoomSpread(candidate, breakdown, warnings, improvements);
    scorePreferredDoublePeriods(state, candidate, breakdown, warnings, improvements);

    const penalty = Object.values(breakdown).reduce((sum, value) => sum + value, 0);
    const hardPenalty = (candidate.hardViolations || []).length * 100;
    const score = Math.max(0, Math.round(100 - penalty - hardPenalty));
    return { score, breakdown, warnings, improvements };
  }

  function scoreSameDaySubjects(state, candidate, breakdown, warnings, improvements) {
    const grouped = new Map();
    candidate.entries.forEach((entry) => {
      const lesson = App.State.getLesson(state, entry.lessonId);
      const limit = lesson ? Number(lesson.sameDayLimit || 1) : 1;
      const key = `${entry.classId}|${entry.subject}|${entry.day}`;
      const list = grouped.get(key) || { count: 0, limit, entry };
      list.count += 1;
      grouped.set(key, list);
    });
    grouped.forEach((value) => {
      if (value.count > value.limit) {
        const over = value.count - value.limit;
        breakdown.sameDaySubject += over * 4;
        warnings.push(`${getClassName(state, value.entry.classId)} の ${value.entry.subject} が ${value.entry.day} に ${value.count} 回あります。`);
        improvements.push(`${value.entry.subject} の一部を別日に移すと偏りが下がります。`);
      }
    });
  }

  function scoreTeacherLoad(state, candidate, breakdown, warnings, improvements) {
    const byTeacherDay = new Map();
    candidate.entries.forEach((entry) => {
      const key = `${entry.teacherId}|${entry.day}`;
      const periods = byTeacherDay.get(key) || [];
      periods.push(Number(entry.period));
      byTeacherDay.set(key, periods);
    });
    byTeacherDay.forEach((periods, key) => {
      periods.sort((a, b) => a - b);
      const [teacherId, day] = key.split("|");
      const teacher = App.State.getTeacher(state, teacherId);
      let maxRun = 1;
      let run = 1;
      for (let index = 1; index < periods.length; index += 1) {
        if (periods[index] === periods[index - 1] + 1) {
          run += 1;
          maxRun = Math.max(maxRun, run);
        } else {
          run = 1;
        }
      }
      const span = periods[periods.length - 1] - periods[0] + 1;
      const gaps = Math.max(0, span - periods.length);
      if (gaps >= 3) {
        breakdown.teacherGaps += gaps;
        warnings.push(`${teacher ? teacher.name : teacherId} の ${day} は空き時間が ${gaps} あります。`);
      }
      if (maxRun >= 4) {
        breakdown.teacherConsecutive += (maxRun - 3) * 3;
        warnings.push(`${teacher ? teacher.name : teacherId} の ${day} は ${maxRun} 連続授業です。`);
        improvements.push(`${teacher ? teacher.name : teacherId} の連続授業を分散すると負荷が下がります。`);
      }
    });
  }

  function scoreClassDailyLoad(state, candidate, breakdown, warnings, improvements) {
    const classes = App.State.getClasses(state);
    classes.forEach((klass) => {
      const loads = state.school.days.map((day) => {
        return candidate.entries.filter((entry) => entry.classId === klass.id && entry.day === day).length;
      });
      const max = Math.max(...loads);
      const min = Math.min(...loads);
      if (max - min >= 3) {
        breakdown.classDailyLoad += (max - min) * 2;
        warnings.push(`${klass.name} は曜日ごとの授業数に偏りがあります。`);
        improvements.push(`${klass.name} の重い曜日から軽い曜日へ授業を移すと均等になります。`);
      }
    });
  }

  function scoreSpecialRoomSpread(candidate, breakdown, warnings, improvements) {
    const byRoomDay = new Map();
    candidate.entries
      .filter((entry) => entry.roomType && entry.roomType !== "普通教室")
      .forEach((entry) => {
        const key = `${entry.roomType}|${entry.day}`;
        byRoomDay.set(key, (byRoomDay.get(key) || 0) + 1);
      });
    byRoomDay.forEach((count, key) => {
      if (count >= 5) {
        const [roomType, day] = key.split("|");
        breakdown.specialRoomSpread += count - 4;
        warnings.push(`${day} に ${roomType} の利用が集中しています。`);
        improvements.push(`${roomType} 利用を別日に分散すると調整しやすくなります。`);
      }
    });
  }

  function scorePreferredDoublePeriods(state, candidate, breakdown, warnings, improvements) {
    state.lessons
      .filter((lesson) => App.State.getDoubleMode(lesson) === "preferred")
      .forEach((lesson) => {
        const entries = candidate.entries
          .filter((entry) => entry.lessonId === lesson.id)
          .sort((a, b) => slotSortValue(state, a) - slotSortValue(state, b));
        let pairs = 0;
        const used = new Set();
        entries.forEach((entry, index) => {
          if (used.has(index)) return;
          const pairIndex = entries.findIndex((other, otherIndex) => {
            return !used.has(otherIndex)
              && otherIndex !== index
              && other.day === entry.day
              && Number(other.period) === Number(entry.period) + 1;
          });
          if (pairIndex >= 0) {
            used.add(index);
            used.add(pairIndex);
            pairs += 1;
          }
        });
        const desiredPairs = Math.floor(entries.length / 2);
        const missingPairs = Math.max(0, desiredPairs - pairs);
        if (missingPairs > 0) {
          breakdown.doublePreferred += missingPairs * 2;
          warnings.push(`${getClassName(state, lesson.classId)} の ${lesson.subject} は2時間連続が望ましい設定ですが、連続枠が不足しています。`);
          improvements.push(`${lesson.subject} を連続する2コマへ寄せると実技・実験の運用がしやすくなります。`);
        }
      });
  }

  function slotSortValue(state, entry) {
    const dayIndex = state.school.days.indexOf(entry.day);
    return dayIndex * 10 + Number(entry.period || 0);
  }

  function getClassName(state, classId) {
    const klass = App.State.getClasses(state).find((item) => item.id === classId);
    return klass ? klass.name : classId;
  }

  App.Scoring = {
    scoreCandidate
  };
})(globalThis);
