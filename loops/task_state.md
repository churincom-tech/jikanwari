# Task State

## 現在フェーズ
条件設定UX、固定授業上限、教育課程マスタの改善完了

## 最終目的
中学校の教務担当者、管理職、時間割作成担当者が使える時間割自動作成Webアプリを、要件整理、設計、試作、評価、改善を経て作る。

## 作業対象
入力フォームから時間割候補を生成表示する無料ローカルWebアプリの最小試作。現在は、操作感を「職員室ナビ」方向へ改善した手順型UI。

## 入力済み資料
- `C:\Users\nakab\Downloads\codex_timetable_agent_prompt.md`
- ユーザー要望: 学年・クラス数・曜日・時限数、教科ごとの週時数・担当教員・特別教室、固定授業・勤務不可時間・必ず守りたい条件を入力し、時間割候補を表示するアプリを目指す
- ユーザー方針: 有料APIは使用せず、完全無料のローカルWebアプリとして開発する
- ユーザー方針: 操作感をもっと直感的にし、中学校に適した雰囲気にする。ImageGen素材を利用する

## 不足情報
- 実際に最初の試作で使う学校規模の最終確認
- 初期表示する候補数の最終確認
- 入力を手入力中心にするか、CSV/JSON併用にするかの最終確認

## 仮定
- 日本の一般的な中学校
- 週5日、1日6時限
- まず1週間分の標準時間割
- 初期試作では認証や複数校管理は後回し
- 最小試作では最大3案の候補表示を初期案にする
- 最小試作では画面手入力を主、JSON保存を補助にする
- 技術スタックはHTML/CSS/Vanilla JavaScriptの静的ローカルWebアプリとする
- 有料API、外部API、外部CDNは使わない

## 直近判断
既存のHTML/CSS/Vanilla JavaScript構成を維持し、条件設定は「クラスを選ぶ -> 授業を選ぶ -> 表のマスをクリック」を主操作にする。一覧編集や条件詳細は折りたたみ、固定授業は登録週時数を超えて置けないハード制約として扱う。教育課程マスタは通常非表示の裏側設定とし、技術と家庭科の分離、合算チェック、将来の教科名・標準時数変更に対応する。

## 品質状態
サンプルデータで3候補を生成し、全候補でハード制約違反0件、途中空き0件を確認済み。固定授業の週時数超過は入力検証でエラーになり、画面でも上限到達済み授業を追加できない。条件設定UI、教育課程マスタ、コマいぬ名称とfaviconの確認結果は `artifacts/verification/fixed_conditions_ux_and_curriculum_check.md` を参照。

## ブロッカー
- 実学校データまたは具体的なサンプル条件が未提供

## 次の最小アクション
ユーザーが `app/index.html` または確認用URLで、条件設定の表クリック操作、折りたたみ詳細、固定授業上限の表示を確認する。次は教員の勤務不可入力や授業情報入力の負担をさらに減らす。

## 反復回数
| ループ | 回数 |
| --- | --- |
| コンテキスト収集 | 0 |
| 設計 | 3 |
| 試作 | 1 |
| 実装 | 3 |
| レビュー・修正 | 2 |
| ハーネス改善 | 0 |
## 2026-07-02 State Update
| Item | Content |
| --- | --- |
| Current phase | Timetable validity and result readability revision complete |
| Work | Added hard constraint `H-008` for no middle gaps, adjusted generation to avoid class/day gaps, fixed timetable column layout, and shortened long technology/home economics labels inside result cells. |
| Verification | Syntax passed. Standard sample generated 3 valid candidates with no middle gaps. Browser check passed at `http://127.0.0.1:8797/`; single and all-class day columns had 0px width delta and console errors 0. |
| Next action | Continue improving real-school constraints such as grade/term hour allocation, manual adjustment, CSV/PDF export polish, or teacher/room-specific result views. |

## 2026-07-02 State Update 2
| Item | Content |
| --- | --- |
| Current phase | Fixed conditions UX and curriculum master revision complete |
| Work | Reworked condition setting into a class/lesson/grid-click flow, moved manual fixed-list editing and constraint details into collapsed sections, enforced fixed-assignment weekly-count limits, separated `技術` and `家庭科`, added curriculum master adjustment, and updated the app identity to `コマいぬ`. |
| Verification | Syntax passed. Standard sample generated 3 valid candidates with hard violations 0, 0, 0 and middle gaps 0, 0, 0. Artificial fixed overflow was rejected. Browser check passed at `http://127.0.0.1:8799/` with console errors 0. |
| Next action | Confirm whether the new condition-setting flow feels intuitive, then continue simplifying teacher availability and lesson-entry workflows. |

## 2026-07-02 State Update 3
| Item | Content |
| --- | --- |
| Current phase | Balanced timetable shape and sample result revision complete |
| Work | Updated the active project path to `C:\Users\nakab\Documents\時間割作成アプリ`. Changed the header sample action to `時間割サンプル例`. Revised generation so each class/day fills from 1st period, stays within balanced daily lengths, and reserves required 2-period lessons before ordinary lessons. Added `H-010` for natural daily load balancing. Confirmed all-class result view is present and working. |
| Verification | Syntax passed for `timetable-core.js`, `state.js`, `main.js`, and `sample-data.js`. Standard sample generated 3 candidates with 174 entries each, hard violations 0, table-shape issues 0. Browser check passed at `http://127.0.0.1:8801/`: all-class view showed 6 tables, DOM table-shape issues 0, console errors 0. |
| Next action | Consider a future annual-hours/alternate-week model so 45-hour and 50-hour annual subjects can be represented more exactly than a single 35-week representative timetable. |

## 2026-07-02 State Update 4
| Item | Content |
| --- | --- |
| Current phase | Double-period sample and editable sample workflow revision complete |
| Work | Adjusted the sample so grade 1/2 `技術・家庭` appears as class-specific 2-period `技術` or `家庭科` blocks while preserving combined standard hours. Strengthened preferred adjacent placement for `理科` and `保体`. Added result-view regeneration guidance after sample edits, and made weekly-count edits invalidate stale candidates immediately. |
| Verification | Syntax passed for changed scripts. Standard sample generated 3 candidates with hard violations 0 and shape issues 0. Browser all-class view detected 21 adjacent pairs among `美術`, `技術`, `家庭科`, `理科`, and `保体`; editing a sample lesson showed `この条件で作り直す`, and inline regeneration produced 3 candidates. Console errors 0. |
| Next action | Add a real annual-hours / alternating-week model if the user wants exact handling of 35-hour and 45-hour subjects as every-other-week 2-period blocks. |

## 2026-07-02 State Update 5
| Item | Content |
| --- | --- |
| Current phase | Lunch-break and double-period realism revision complete |
| Work | Removed double-period treatment from `理科` and `保体`. Added hard constraints `H-011` for no double-period crossing between 4th and 5th periods, and `H-012` for no adjacent placement when a lesson is not configured as double-period. Updated generation, candidate validation, sample/default curriculum, and constraint catalog. |
| Verification | Syntax passed for changed scripts. Standard sample generated 3 candidates with hard violations 0, table-shape issues 0, `理科/保体` adjacent pairs 0, and 4-5 crossing pairs 0. Browser all-class view showed 6 tables and console errors 0. |
| Next action | If needed, expose lunch-break position as a school setting instead of hardcoding the default break after 4th period. |

## 2026-07-02 State Update 6
| Item | Content |
| --- | --- |
| Current phase | Navigation and input UX revision complete |
| Work | Normalized left navigation so numbered items are screen destinations, moved the generate action between condition setting and results, revised school information inputs and wording, changed lesson-row continuous-placement UI to `配置ルール`, updated the header to `時間割作成サポートアプリ / コマいぬ！`, reordered header actions, removed duplicate banner label/art, and added `コマいぬ！を開く.html` in the project root. |
| Verification | Syntax passed for changed scripts. Standard sample generated 3 candidates with hard violations 0, 0, 0. Browser check passed at `http://127.0.0.1:8804/` with console errors 0. |
| Next action | Confirm whether the new root launcher and simplified input UI feel easier in Explorer and the browser. Existing copy files in `app` remain untouched until deletion is explicitly requested. |
