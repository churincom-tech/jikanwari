# Iteration Log

## 2026-06-30 初期化
| 項目 | 内容 |
| --- | --- |
| 実行ループ | エージェント環境初期化 |
| 入力 | `codex_timetable_agent_prompt.md` |
| 実行内容 | AGENTS、要件文書、ループ、レビュー、Skill構成を作成 |
| 検証結果 | 必須ファイル11件、Skill 11件、各Skillの `name` / `description` を確認済み。`artifacts/verification/recognition_check.md` に記録 |
| 失敗 | なし |
| 修正 | なし |
| 持ち越し事項 | ユーザーから学校条件と制約情報を受け取る。Webアプリ本体の制作はまだ開始していない |

## 2026-06-30 要件更新
| 項目 | 内容 |
| --- | --- |
| 実行ループ | 要件整理 |
| 入力 | ユーザー要望: 必要情報を入力すると時間割候補が表示されるアプリを目指す |
| 実行内容 | `PROJECT_SPEC.md`、`docs/timetable_requirements.md`、`docs/prototype_scope.md`、`docs/app_feature_map.md`、`docs/timetable_data_model.md`、`docs/success_criteria.md` を更新し、`docs/user_input_to_candidate_flow.md` を追加 |
| 検証結果 | 画面入力、条件確認、候補生成、候補表示の流れが文書化された |
| 失敗 | なし |
| 修正 | CSV/JSON中心の表現を、画面入力中心の初期試作へ調整 |
| 持ち越し事項 | 実装開始前に、試作で使う学校規模、候補表示数、技術スタックを確認する |

## 2026-06-30 最小試作画面設計
| 項目 | 内容 |
| --- | --- |
| 実行ループ | 試作設計 |
| 入力 | `/goal 入力フォーム項目と時間割候補表示画面の最小試作設計を作成する` |
| 実行内容 | `docs/minimal_prototype_screen_design.md` を追加し、画面構成、入力項目、候補表示、受け入れ条件、実装前確認事項を整理。`docs/app_feature_map.md`、`docs/prototype_scope.md`、`docs/evaluation_plan.md`、`context/assumptions.md` を更新 |
| 検証結果 | `artifacts/verification/minimal_prototype_screen_design_check.md` に要件別確認と品質ゲート確認を記録 |
| 失敗 | なし |
| 修正 | 候補数、入力方式、学校規模は仮定として分離 |
| 持ち越し事項 | 実装開始にはユーザー承認が必要。次は技術スタック選定または最小試作実装 |

## 2026-06-30 技術スタック決定と実装計画
| 項目 | 内容 |
| --- | --- |
| 実行ループ | 技術設計、試作計画 |
| 入力 | `/goal 時間割作成アプリの技術スタックを決めて、最小試作の実装計画を作成する`、ユーザー方針: 有料APIなし、完全無料ローカルWebアプリ |
| 実行内容 | `docs/technology_stack_decision.md` と `docs/minimal_prototype_implementation_plan.md` を追加。`docs/constraints.md`、`PROJECT_SPEC.md`、`context/assumptions.md`、`docs/prototype_scope.md`、`docs/app_feature_map.md` を更新 |
| 検証結果 | `artifacts/verification/technology_stack_and_implementation_plan_check.md` に要件別確認と品質ゲート確認を記録 |
| 失敗 | なし |
| 修正 | 技術スタックをHTML/CSS/Vanilla JavaScriptの静的ローカルWebアプリに決定。有料API、外部API、外部CDNなしを制約へ反映 |
| 持ち越し事項 | 実装開始にはユーザー承認が必要。サンプル条件は初期推奨値で開始可能 |

## 2026-06-30 無料ローカルWebアプリ最小試作実装
| 項目 | 内容 |
| --- | --- |
| 実行ループ | 実装、検証 |
| 入力 | `/goal 入力フォームから時間割候補を生成表示する無料ローカルWebアプリの最小試作を実装する` |
| 実行内容 | `app/` に静的Webアプリを実装。入力フォーム、状態管理、サンプルデータ、条件確認、候補生成、スコア、JSON保存/読込を追加 |
| 検証結果 | `artifacts/verification/local_web_app_prototype_check.md` に記録。サンプルデータで3候補生成、全候補ハード制約違反0件、外部通信参照なし |
| 失敗 | 初回サンプルで全クラス同一教員の固定学活が衝突した |
| 修正 | 各クラスの担任コードを追加し、固定学活の教員重複を解消 |
| 持ち越し事項 | 実ブラウザの自動スクリーンショット検証は環境上未実施。ユーザー操作での見た目確認と改善 |

## 2026-06-30 職員室ナビUI改善
| 項目 | 内容 |
| --- | --- |
| 実行ループ | Product Design、実装、検証 |
| 入力 | ユーザー選択: ImageGen案1「職員室ナビ」。ユーザー方針: 迷わせないユーザーファースト、中学校に適した雰囲気、ImageGen素材利用 |
| 実行内容 | `app/index.html`、`app/styles.css`、`app/scripts/main.js` を更新。左手順ナビ、入力見通し、職員室風バナー、戻る/次へ導線、まず試すから候補生成までの導線を追加 |
| 検証結果 | `artifacts/verification/intuitive_ui_redesign_check.md` と `design-qa.md` に記録。ブラウザで初期表示、まず試す、モバイル幅を確認 |
| 失敗 | `file://` はブラウザ安全ポリシーで開けなかった。Python簡易サーバーのバックグラウンド起動はPowerShell環境差で失敗 |
| 修正 | Node REPL内のローカル静的サーバーで確認。fullPageスクリーンショットは表示が崩れたため、viewportスクリーンショットでQAした |
| 持ち越し事項 | 実ユーザー操作で、文言、入力順、候補比較の見せ方をさらに調整する |

## 2026-06-30 結果画面重なり修正
| 項目 | 内容 |
| --- | --- |
| 実行ループ | UI修正、検証 |
| 入力 | ユーザー指摘: 完成した時間割と詳細がかぶってしまうのが嫌 |
| 実行内容 | 結果画面の2カラム表示を1カラムに変更し、候補詳細を時間割表の下へ移動 |
| 検証結果 | `artifacts/verification/result_layout_no_overlap_check.md` に記録。ブラウザで `detailsBelowGrid: true`、横はみ出しなし、コンソールエラー0件 |
| 失敗 | なし |
| 修正 | `app/index.html` に `result-main` を追加、`app/styles.css` の `.result-layout` と関連幅指定を修正 |
| 持ち越し事項 | 詳細の折りたたみ、詳細タブ化、印刷用レイアウトの検討 |

## 2026-06-30 2時間連続授業と実態寄りサンプル
| 項目 | 内容 |
| --- | --- |
| 実行ループ | 制約設計、実装、時間割検証 |
| 入力 | ユーザー要望: 2時間続き授業への対応、国の標準授業時数に寄せた「まず試す」、白紙初期化ボタン |
| 実行内容 | 連続授業モード `通常 / 2時間連続必須 / 2時間連続が望ましい` を追加。H-007/S-007を追加。生成時に必須連続授業を2コマ単位で配置。サンプルを標準授業時数の35週換算へ変更。`白紙から` ボタンを追加 |
| 検証結果 | `artifacts/verification/double_period_and_realistic_sample_check.md` に記録。候補3件、ハード違反0件、2時間連続必須6件の連続配置を確認 |
| 失敗 | 初回は標準週29コマと連続必須に対して探索回数が少なく候補0件だった。さらに単一教員に負荷が集中しスコアが0になった |
| 修正 | 探索回数を増やし、サンプル教員を複数化。ソフト評価を「望ましい」に合う重みに調整 |
| 持ち越し事項 | 年間時数45/50時間など週へ割り切れない教科を、将来は年間時数または隔週パターンで扱う |

## 2026-06-30 Home Economics Room Revision
| Item | Content |
| --- | --- |
| Trigger | User pointed out that the room list did not include `家庭科室`. |
| Work | Added `家庭科室` to blank defaults and sample data. Split sample `技術・家庭` into technology and home economics entries using `技術室` and `家庭科室`. |
| Verification | Syntax check passed. Sample generated 3 candidates with hard violations 0, 0, 0. Browser check found 7 room rows and `家庭科室` lesson data. |
| Artifact | `artifacts/verification/home_economics_room_check.md` |

## 2026-07-01 UX Input Selection And Results Revision
| Item | Content |
| --- | --- |
| Trigger | User requested clearer input/selection UX and all-class result overview with print/PDF. |
| Work | Updated guide wording, school input helpers, lesson cards, double-period segmented buttons, fixed-lesson board, all-class results view, and print stylesheet. |
| Verification | Syntax passed. Sample generated 3 candidates with hard violations 0, 0, 0. Browser check passed at `http://127.0.0.1:8796/` with console errors 0. |
| Artifact | `artifacts/verification/ux_input_selection_and_results_check.md` |

## 2026-07-02 No Midday Gaps And Fixed Columns Revision
| Item | Content |
| --- | --- |
| Trigger | User pointed out that a normal class timetable should not leave an empty mid-day slot before later lessons, and that long labels were stretching one day column. |
| Work | Added hard constraint `H-008`, biased generation toward earliest open periods per class/day, validated middle gaps after generation, fixed timetable table layout, and shortened long technology/home economics labels in cells. |
| Verification | Syntax passed. Standard sample generated 3 candidates with hard violations 0, 0, 0 and middle gaps 0, 0, 0. Browser check passed at `http://127.0.0.1:8797/` with day-column width delta 0px and console errors 0. |
| Artifact | `artifacts/verification/no_midday_gaps_fixed_columns_check.md` |

## 2026-07-02 Fixed Conditions UX And Curriculum Revision
| Item | Content |
| --- | --- |
| Trigger | User said the condition-setting screen was not intuitive and pointed out that fixed lessons should not exceed each lesson's registered weekly count. User also confirmed the app name `コマいぬ`. |
| Work | Reworked condition setting into a primary table-click workflow, collapsed manual fixed-list editing and constraint details, added remaining fixed-slot status, disabled over-limit fixed lesson options, added `H-009`, added curriculum master support for separated `技術` and `家庭科` with optional combined checking, and updated app name/icon/favicon to `コマいぬ`. |
| Verification | Syntax passed. Standard sample generated 3 candidates with hard violations 0, 0, 0 and middle gaps 0, 0, 0. Artificial fixed overflow is rejected. Browser check passed at `http://127.0.0.1:8799/` with collapsed details, disabled full fixed option, horizontal overflow 0, and console errors 0. |
| Artifact | `artifacts/verification/fixed_conditions_ux_and_curriculum_check.md` |

## 2026-07-02 Balanced Day Sample And All Classes Revision
| Item | Content |
| --- | --- |
| Trigger | User reported unrealistic timetable shapes such as blank 5th period on Thursday and Friday having only scattered periods, and noted that all-class overview disappeared. User also requested renaming `まず試す` and keeping the sample aligned with current junior high school subject hours. |
| Work | Updated generation to use class/day target lengths and reject placements beyond the normal daily frame. Non-fixed lessons now fill from the earliest open period, required double-period lessons are reserved before single-period choices, and `H-010` documents natural daily load balancing. Renamed the header sample action to `時間割サンプル例`. |
| Verification | Syntax passed. Standard sample generated 3 candidates with 174 entries each, hard violations 0, and table-shape issues 0. Browser check passed at `http://127.0.0.1:8801/`: sample button text correct, all-class view showed 6 tables, DOM table-shape issues 0, console errors 0. |
| Artifact | `artifacts/verification/balanced_day_sample_all_classes_check.md` |

## 2026-07-02 Double Period Sample And Edit Regeneration Revision
| Item | Content |
| --- | --- |
| Trigger | User pointed out that ordinary double-period subjects were not reflected in the sample, asked to align with MEXT subject hours, and asked whether editing the sample is allowed after results disappeared. |
| Work | Kept the MEXT annual-hours intent as a 35-week representative timetable. Changed grade 1 and 2 `技術・家庭` sample weeks into required 2-period `技術` or `家庭科` blocks by class. Strengthened preferred double placement for `理科` and `保体`. Added result-view guidance and inline regeneration when sample lesson data is edited. Made numeric lesson inputs invalidate stale candidates immediately. |
| Verification | Syntax passed. Standard sample generated 3 candidates with 174 entries each, hard violations 0, shape issues 0, and 21 double-period pairs in all-class DOM. Editing a sample weekly count cleared stale candidates and inline regeneration produced 3 candidates. Console errors 0. |
| Artifact | `artifacts/verification/double_period_sample_edit_check.md` |

## 2026-07-02 Lunch Break And Double-Period Constraint Revision
| Item | Content |
| --- | --- |
| Trigger | User correctly pointed out that `理科` and `保体` should not be treated as double-period subjects, and that double-period lessons must not cross 4th-5th period because lunch is between them. |
| Work | Removed double-period preference from `理科` and `保体` in sample/default curriculum. Added `H-011` to reject double-period blocks crossing lunch after 4th period. Added `H-012` to prevent adjacent placement for lessons without double-period mode. Updated the constraint catalog. |
| Verification | Syntax passed. Standard sample generated 3 candidates with hard violations 0, shape issues 0, `理科/保体` adjacent pairs 0, and 4-5 crossing pairs 0. Browser all-class view confirmed 6 tables, no `理科/保体` pairs, no 4-5 crossing pairs, and console errors 0. |
| Artifact | `artifacts/verification/lunch_break_double_constraints_check.md` |

## 2026-07-02 Navigation, Input UX, Header, And Launcher Revision
| Item | Content |
| --- | --- |
| Trigger | User pointed out inconsistent left navigation behavior, unclear school-information wording, awkward header action order, unnecessary repeated labels/art, poor lesson rule UI, and inconvenient app launch location. |
| Work | Made numbered left-nav items screen navigation only, placed the generate action between condition setting and results, changed school settings to grouped selects with clearer labels, removed the banner eyebrow/art, changed lesson-row `2時間続き` segmented controls to a `配置ルール` select, updated the header to `時間割作成サポートアプリ / コマいぬ！`, reordered header actions, and added root launcher `コマいぬ！を開く.html`. |
| Verification | Syntax passed for changed scripts. Standard sample generated 3 candidates with hard violations 0, 0, 0. Ordinary adjacent fixed lessons correctly produced 0 candidates with a clear blocking reason. Browser check passed at `http://127.0.0.1:8804/`: header order correct, school controls are selects, old quick settings removed, banner duplicate label/art removed, lesson rule UI uses selects, and console errors 0. |
| Artifact | `artifacts/verification/navigation_school_lesson_header_launcher_check.md` |
