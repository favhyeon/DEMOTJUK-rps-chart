/* ==========================================
   데못죽 알페스 취향표
========================================== */

/* 표(행/열 헤더)에 표시할 멤버 이름 (테스타 7명 + 브이틱 5명 = 12명) */
const members = [
    "배세진",
    "류청우",
    "선아현",
    "이세진",
    "박문대",
    "차유진",
    "김래빈",
    "청려",
    "채율",
    "신오",
    "주단",
    "비한"
];

/* 표 헤더 그라데이션 색 (style.css의 --c-1 ~ --c-4 와 같은 색).
   createTable()이 파일 중간에서 먼저 실행되므로 반드시 위쪽에 둬야 한다. */
const HEADER_STOPS = ["#c092d2", "#9189cc", "#65a1d6", "#65a1d6"];

/* 멤버별 본인 이니셜 (닉네임, 행/열 숨기기 문구에 사용) */
const ownInitials = ["배", "청", "앟", "큰", "문", "윶", "랩", "엋", "율", "신", "단", "뱐"];

/* 멤버별 기본 아바타 색상 (사진 로드 실패 시 대체용) - #c092d2 -> #9189cc -> #65a1d6 그라데이션(하늘색이 주가 되도록 뒤쪽에 더 배치) */
const memberColors = [
    "#c092d2",
    "#b390d0",
    "#a68dcf",
    "#9a8bcd",
    "#8d8bcd",
    "#8192d0",
    "#7598d2",
    "#699fd5",
    "#65a1d6",
    "#65a1d6",
    "#65a1d6",
    "#65a1d6"
];

/* 멤버별 기본 프로필 사진 (members 배열과 순서 동일, m1~m7=테스타, m8~m12=브이틱) */
const defaultPhotos = [
    "assets/m1.png",
    "assets/m2.png",
    "assets/m3.png",
    "assets/m4.png",
    "assets/m5.png",
    "assets/m6.png",
    "assets/m7.png",
    "assets/m8.png",
    "assets/m9.png",
    "assets/m10.png",
    "assets/m11.png",
    "assets/m12.png"
];

/*
 * 표에 표시할 씨피명.
 * [행 멤버][열 멤버] 순서. 
 * 멤버 이니셜 순서: ['배', '청', '앟', '큰', '문', '윶', '랩', '엋', '율', '신', '단', '뱐']
 */
const pairNames = [
    ["배배", "배청", "배앟", "배큰", "배문", "배윶", "배랩", "배엋", "배율", "배신", "배단", "배뱐"],
    ["청배", "청청", "청앟", "청큰", "청문", "청윶", "청랩", "청엋", "청율", "청신", "청단", "청뱐"],
    ["앟배", "앟청", "앟앟", "앟큰", "앟문", "앟윶", "앟랩", "앟엋", "앟율", "앟신", "앟단", "앟뱐"],
    ["큰배", "큰청", "큰앟", "큰큰", "큰문", "큰윶", "큰랩", "큰엋", "큰율", "큰신", "큰단", "큰뱐"],
    ["댕뵤", "문국", "문앟", "문큰", "문문", "문윶", "문랩", "문엋", "문율", "문신", "문단", "문뱐"],
    ["윶배", "윶청", "윶앟", "윶큰", "윶문", "윶윶", "윶랩", "윶엋", "윶율", "윶신", "윶단", "윶뱐"],
    ["랩배", "랩청", "랩앟", "랩큰", "랩문", "랩윶", "랩랩", "랩엋", "랩율", "랩신", "랩단", "랩뱐"],
    ["엋배", "엋청", "엋앟", "엋큰", "엋문", "엋윶", "엋랩", "엋엋", "엋율", "엋신", "엋단", "엋뱐"],
    ["율배", "율청", "율앟", "율큰", "율문", "율윶", "율랩", "율엋", "율율", "율신", "율단", "율뱐"],
    ["신배", "신청", "신앟", "신큰", "신문", "신윶", "신랩", "신엋", "신율", "신신", "신단", "신뱐"],
    ["단배", "단청", "단앟", "단큰", "단문", "단윶", "단랩", "단엋", "단율", "단신", "단단", "단뱐"],
    ["뱐배", "뱐청", "뱐앟", "뱐큰", "뱐문", "뱐윶", "뱐랩", "뱐엋", "뱐율", "뱐신", "뱐단", "뱐뱐"]
];

const options = [
    { name: "OTP",      color: "#f7cde0" },
    { name: "좋아함",   color: "#ffafaf" },
    { name: "호감",     color: "#fcee90" },
    { name: "관심있음", color: "#baebbb" },
    { name: "관심없음", color: "#ffffff" },
    { name: "별로",     color: "#bfeefd" },
    { name: "지뢰",     color: "#999999" }
];

/* 사용자가 직접 고른 커스텀 색상 (name -> hex).
   여기에 값이 있으면 기본 color 대신 이 색을 쓴다.
   options 배열의 기본값 자체는 절대 덮어쓰지 않는다. */
const CUSTOM_COLOR_KEY = "demotjuk-custom-colors";
let customColors = JSON.parse(localStorage.getItem(CUSTOM_COLOR_KEY)) || {};

function getOptionColor(option) {
    return customColors[option.name] || option.color;
}

function setCustomColor(name, hex) {
    customColors[name] = hex;
    localStorage.setItem(CUSTOM_COLOR_KEY, JSON.stringify(customColors));
}

function resetCustomColors() {
    customColors = {};
    localStorage.removeItem(CUSTOM_COLOR_KEY);
}

/* 멤버별 의견 글자 크기 (px) */
const LR_FONT_MIN = 12;
const LR_FONT_MAX = 40;
const LR_FONT_DEFAULT = 17;

/* PC 저장 레이아웃(1820px)에서 의견 입력칸의 실제 가로 폭(px).
   = ((1820 - 좌우 패딩 128 - 열 간격 30x2) / 3) - 아바타 112 - 간격 18
   모바일에서는 이 폭 대비 현재 칸 폭의 비율(k)로 글자/칸 크기를 똑같이 줄여서,
   화면에서 보이는 줄바꿈·잘림이 저장 이미지와 같아지게 한다.
   CSS의 PC 레이아웃 값(캡처 폭, 패딩, 열 간격, 아바타 폭)이 바뀌면 이 값도 같이 바꿔야 한다. */
const LR_PC_TEXT_WIDTH = 414;

const STORAGE_KEY = "demotjuk-alpes-rps";
const LR_STORAGE_KEY = "demotjuk-lr-rps";
const LR_CELL_COUNT = 12;

/* 행/열 개별 숨기기 상태 (멤버 인덱스 기준, rows/cols 따로 관리) */
const HIDDEN_KEY = "demotjuk-hidden-members";
const hiddenSaved = JSON.parse(localStorage.getItem(HIDDEN_KEY)) || { rows: [], cols: [] };
let hiddenRows = new Set(hiddenSaved.rows);
let hiddenCols = new Set(hiddenSaved.cols);

function saveHiddenState() {
    localStorage.setItem(HIDDEN_KEY, JSON.stringify({
        rows: [...hiddenRows],
        cols: [...hiddenCols]
    }));
}

/* 자공자수(본인조합, 대각선 칸) 표시 여부 - 체크박스로 켜고 끔
   기본값은 켜짐(기존 동작과 동일)이라, 꺼본 적 없는 사용자는 "0"이 저장돼 있지 않다. */
const SELF_PAIR_KEY = "demotjuk-include-selfpair";
let includeSelfPair = localStorage.getItem(SELF_PAIR_KEY) !== "0";

/* 대각선(본인×본인) 칸을 표시할지 여부에 따라 실제로 화면/이미지에 그릴 텍스트를 반환한다.
   토글이 꺼져 있으면 "-"를 보여준다. */
function getDisplayPairName(rowIndex, colIndex) {
    if (rowIndex === colIndex && !includeSelfPair) {
        return "-";
    }
    return pairNames[rowIndex][colIndex];
}

const table = document.getElementById("chartTable");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const optionGrid = document.getElementById("optionGrid");
const closeModal = document.getElementById("closeModal");

const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const guideListRps = document.getElementById("guideListRps");
const guideListLr = document.getElementById("guideListLr");
const legendRps = document.getElementById("legendRps");

const dateToggleWrap = document.getElementById("dateToggleWrap");
const dateToggle = document.getElementById("dateToggle");
const dateTextRps = document.getElementById("dateTextRps");
const dateTextLr = document.getElementById("dateTextLr");
const selfPairToggle = document.getElementById("selfPairToggle");

const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");

const saveModal = document.getElementById("saveModal");
const previewImage = document.getElementById("previewImage");
const closeSaveModal = document.getElementById("closeSaveModal");

const tabRps = document.getElementById("tabRps");
const tabLr = document.getElementById("tabLr");
const captureAreaRps = document.getElementById("captureArea");
const captureAreaLr = document.getElementById("captureAreaLr");
const lrGrid = document.getElementById("lrGrid");
const photoInput = document.getElementById("photoInput");
const scaleWrap = document.getElementById("scaleWrap");

/* CSS의 @media (max-width: 768px)과 동일한 기준.
   이 폭 이하에서는 JS로 축소하지 않고, 반응형 레이아웃을 그대로 사용한다. */
const MOBILE_BREAKPOINT = 768;

/* 탭마다 캡처(저장) 기준 폭이 다르다.
   - 알페스 취향표: 12명이라 기존보다 넓은 1300px
   - 공수 취향표: 가로가 더 길고 세로는 더 짧게(대략 4:3) 나오도록 1820px로 넓힘
   CSS의 #captureArea / #captureAreaLr width 값과 항상 같아야 한다. */
const CAPTURE_WIDTH = {
    rps: 1300,
    lr: 1820
};

function getCaptureWidth(tab) {
    return CAPTURE_WIDTH[tab] || CAPTURE_WIDTH.rps;
}

let currentTarget = null; // { type: "cell", td } | { type: "row", index } | { type: "col", index }
let currentTab = "rps";
let currentPhotoIndex = null;
let currentBlobUrl = null; // 저장 미리보기/다운로드에 쓰이는 Blob URL (재사용 전 해제)

const HISTORY_LIMIT = 50;
let historyStack = [];
let redoStack = [];

let saveData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

let lrData = JSON.parse(localStorage.getItem(LR_STORAGE_KEY)) || {
    texts: {},
    cells: {},
    photos: {},
    fontSizes: {},
    excluded: {}
};

/* 예전에 저장된 데이터에는 fontSizes가 없으므로 보정 */
lrData.fontSizes = lrData.fontSizes || {};
lrData.excluded = lrData.excluded || {};

const GUIDE_TEXT = {
    rps: [
        "셀을 선택하여 호감도를 표시해주세요.",
        "멤버 이름을 누르면 줄 전체선택/숨기기가 가능해요.",
        "트위터가 아닌 브라우저 열기를 통해 사용해주세요."
    ],
    lr: [
        "L-R 사이 원하는 부분의 칸을 선택하고, 아래 칸에 자유롭게 적어보세요.",
        "각 멤버의 프로필을 누르면 사진 변경이 가능해요.",
        "사진 아래 '제외하기'를 체크하면 그 멤버는 저장 이미지에서 빠져요."
    ]
};

function renderGuide(tab) {
    const target = tab === "rps" ? guideListRps : guideListLr;
    target.innerHTML = "";
    GUIDE_TEXT[tab].forEach(line => {
        const p = document.createElement("p");
        p.textContent = line;
        target.appendChild(p);
    });
}

/* 범례를 options 배열(+커스텀 색상) 기준으로 매번 새로 그린다.
   색이 바뀌어도 범례가 항상 실제 색과 일치하도록. */
function renderLegend() {
    if (!legendRps) return;
    legendRps.innerHTML = "";
    options.forEach(option => {
        const color = getOptionColor(option);
        const isNone = color.toLowerCase() === "#ffffff";
        const item = document.createElement("div");
        item.className = "legend-item";
        item.innerHTML = `
            <span class="color${isNone ? " dashed" : ""}" style="background:${color}"></span>${option.name}
        `;
        legendRps.appendChild(item);
    });
}

/* ==========================================
   날짜 표시 (제목 옆 260810 ver. 형식)
========================================== */

function getDateVerText() {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yy}${mm}${dd} ver.`;
}

function updateDateDisplay() {
    const text = dateToggle.checked ? getDateVerText() : "";
    dateTextRps.textContent = text;
    dateTextLr.textContent = text;
}

dateToggle.addEventListener("change", updateDateDisplay);

/* ==========================================
   자공자수 표시 토글
========================================== */

if (selfPairToggle) {
    selfPairToggle.checked = includeSelfPair;

    selfPairToggle.addEventListener("change", () => {
        includeSelfPair = selfPairToggle.checked;
        localStorage.setItem(SELF_PAIR_KEY, includeSelfPair ? "1" : "0");
        createTable();
    });
}

/* ==========================================
   그룹 전환 (데못죽 / TeSTAR / VTIC)
   현재 페이지가 어떤 그룹인지는 CURRENT_GROUP만 다르고,
   나머지 코드는 세 사이트 모두 동일하게 사용한다.
========================================== */

const CURRENT_GROUP = "demotjuk";

const GROUP_URLS = {
    demotjuk: "https://favhyeon.github.io/DEMOTJUK-rps-chart/",
    testar: "https://favhyeon.github.io/TeSTAR-rps-chart/",
    vtic: "https://favhyeon.github.io/VTIC-rps-chart/"
};

const groupRadios = document.querySelectorAll('input[name="groupSelect"]');

groupRadios.forEach(radio => {
    if (radio.value === CURRENT_GROUP) {
        radio.checked = true;
    }

    radio.addEventListener("change", () => {
        if (!radio.checked) return;

        const target = radio.value;
        if (target === CURRENT_GROUP) return;

        const url = GROUP_URLS[target];
        if (url) {
            window.location.href = url;
        }
    });
});

createTable();
createLrGrid();
updateNavButtons();
renderGuide(currentTab);
renderLegend();
updateDateDisplay();

/* ==========================================
   탭 전환
========================================== */

function switchTab(tab) {
    currentTab = tab;

    if (tab === "rps") {
        captureAreaRps.classList.remove("hidden");
        captureAreaLr.classList.add("hidden");
        tabRps.classList.add("active");
        tabLr.classList.remove("active");
    } else {
        captureAreaLr.classList.remove("hidden");
        captureAreaRps.classList.add("hidden");
        tabLr.classList.add("active");
        tabRps.classList.remove("active");
    }

    renderGuide(tab);
    fitCaptureArea();
}

tabRps.addEventListener("click", () => switchTab("rps"));
tabLr.addEventListener("click", () => switchTab("lr"));

/* ==========================================
   알페스 취향표 - 표 생성
========================================== */

/* 표 헤더(맨 윗줄, 맨 왼쪽 열) 그라데이션 색.
   칸마다 자기 배경색을 가져야 왼쪽 열을 고정(sticky)해도 색이 어긋나지 않는다.
   style.css의 --c-1 ~ --c-4 와 같은 색이다. */

function headerColor(t) {
    const hex = h => [1, 3, 5].map(k => parseInt(h.slice(k, k + 2), 16));
    const n = HEADER_STOPS.length - 1;
    const p = Math.min(Math.max(t, 0), 1) * n;
    const i = Math.min(Math.floor(p), n - 1);
    const f = p - i;
    const a = hex(HEADER_STOPS[i]);
    const b = hex(HEADER_STOPS[i + 1]);
    return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(",")})`;
}

function createTable() {
    table.innerHTML = "";

    const visibleColIndexes = members.map((_, i) => i).filter(i => !hiddenCols.has(i));
    const visibleRowIndexes = members.map((_, i) => i).filter(i => !hiddenRows.has(i));

    /* 모바일 가로 스크롤/왼쪽 칸 고정용 CSS 변수 (열 개수, 전체 행 수) */
    table.style.setProperty("--cols", visibleColIndexes.length);

    const head = document.createElement("tr");
    const empty = document.createElement("th");
    empty.className = "corner";
    empty.style.setProperty("--hbg", headerColor(0));
    head.appendChild(empty);

    visibleColIndexes.forEach((colIndex, pos) => {
        const th = document.createElement("th");
        th.style.setProperty("--hbg", headerColor((pos + 1.5) / (visibleColIndexes.length + 1)));
        th.textContent = members[colIndex];
        th.classList.add("clickable-header");

        th.addEventListener("click", () => {
            currentTarget = { type: "col", index: colIndex };
            openModal(members[colIndex]);
        });

        head.appendChild(th);
    });

    table.appendChild(head);

    visibleRowIndexes.forEach(rowIndex => {
        const tr = document.createElement("tr");

        const rowHead = document.createElement("th");
        rowHead.textContent = members[rowIndex];
        rowHead.classList.add("clickable-header");
        rowHead.style.setProperty("--hbg", headerColor((visibleRowIndexes.indexOf(rowIndex) + 1.5) / (visibleRowIndexes.length + 1)));

        rowHead.addEventListener("click", () => {
            currentTarget = { type: "row", index: rowIndex };
            openModal(members[rowIndex]);
        });

        tr.appendChild(rowHead);

        visibleColIndexes.forEach(colIndex => {
            const td = document.createElement("td");
            td.dataset.key = `${rowIndex}-${colIndex}`;

            td.textContent = getDisplayPairName(rowIndex, colIndex);

            if (rowIndex === colIndex) {
                td.classList.add("diagonal");
            }

            if (saveData[td.dataset.key]) {
                td.style.backgroundColor = saveData[td.dataset.key];
            }

            td.addEventListener("click", () => {
                currentTarget = { type: "cell", td };
                openModal(getDisplayPairName(rowIndex, colIndex));
            });

            tr.appendChild(td);
        });

        table.appendChild(tr);
    });
}

/* ==========================================
   알페스 취향표 - 이전/이후 (실행 취소)
========================================== */

function pushHistory() {
    historyStack.push(JSON.stringify(saveData));
    if (historyStack.length > HISTORY_LIMIT) {
        historyStack.shift();
    }
    redoStack = [];
    updateNavButtons();
}

function updateNavButtons() {
    undoBtn.disabled = historyStack.length === 0;
    redoBtn.disabled = redoStack.length === 0;
}

undoBtn.addEventListener("click", () => {
    if (historyStack.length === 0) return;

    redoStack.push(JSON.stringify(saveData));
    saveData = JSON.parse(historyStack.pop());

    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
    createTable();
    updateNavButtons();
});

redoBtn.addEventListener("click", () => {
    if (redoStack.length === 0) return;

    historyStack.push(JSON.stringify(saveData));
    saveData = JSON.parse(redoStack.pop());

    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
    createTable();
    updateNavButtons();
});

/* ==========================================
   색상 선택 모달
========================================== */

function openModal(titleText) {
    modalTitle.textContent = titleText;
    optionGrid.innerHTML = "";

    options.forEach(option => {
        const color = getOptionColor(option);
        const item = document.createElement("div");
        item.className = "option-card";

        const isNone = color.toLowerCase() === "#ffffff";

        item.innerHTML = `
            <span class="option-dot-wrap">
                <span class="option-dot${isNone ? " dashed" : ""}" style="background:${color}"></span>
                <label class="color-edit-btn" title="이 색상 직접 고르기">
                    &#9998;
                    <input type="color" class="color-edit-input" value="${color.length === 7 ? color : "#ffffff"}">
                </label>
            </span>
            <span class="option-label">${option.name}</span>
        `;

        // 카드(동그라미) 클릭 -> 이 색을 셀에 적용
        item.addEventListener("click", () => applySelection(getOptionColor(option)));

        // 연필 아이콘 클릭은 셀 적용과 별개로, 색상 피커만 열기
        const editBtn = item.querySelector(".color-edit-btn");
        const editInput = item.querySelector(".color-edit-input");
        editBtn.addEventListener("click", (e) => e.stopPropagation());
        editInput.addEventListener("click", (e) => e.stopPropagation());
        editInput.addEventListener("input", (e) => {
            const hex = e.target.value;
            item.querySelector(".option-dot").style.background = hex;
        });
        editInput.addEventListener("change", (e) => {
            setCustomColor(option.name, e.target.value);
            renderLegend();
        });

        optionGrid.appendChild(item);
    });

    const clearItem = document.createElement("div");
    clearItem.className = "option-card clear-card";
    clearItem.innerHTML = `
        <span class="option-dot">&#128465;</span>
        <span class="option-label">선택 지우기</span>
    `;
    clearItem.addEventListener("click", () => applySelection(null));
    optionGrid.appendChild(clearItem);

    modal.classList.remove("hidden");

    renderModalExtra(titleText);
}

/* 모달 하단(색상 기본값 되돌리기 + 행/열 숨기기 체크박스) 영역.
   모달을 열 때마다 currentTarget 기준으로 다시 그린다. */
function renderModalExtra(titleText) {
    let modalExtra = document.getElementById("modalExtra");
    if (!modalExtra) {
        modalExtra = document.createElement("div");
        modalExtra.id = "modalExtra";
        modalExtra.className = "modal-extra";
        optionGrid.insertAdjacentElement("afterend", modalExtra);
    }
    modalExtra.innerHTML = "";

    const resetLink = document.createElement("div");
    resetLink.className = "reset-colors-link";
    resetLink.textContent = "색상 기본값으로 되돌리기";
    resetLink.addEventListener("click", () => {
        resetCustomColors();
        renderLegend();
        openModal(titleText);
    });
    modalExtra.appendChild(resetLink);

    if (!currentTarget || (currentTarget.type !== "row" && currentTarget.type !== "col")) {
        return;
    }

    const isRow = currentTarget.type === "row";
    const index = currentTarget.index;
    const hiddenSet = isRow ? hiddenRows : hiddenCols;
    const suffix = isRow ? "왼" : "른";

    const hideLabel = document.createElement("label");
    hideLabel.className = "hide-toggle";

    const hideInput = document.createElement("input");
    hideInput.type = "checkbox";
    hideInput.checked = hiddenSet.has(index);

    hideInput.addEventListener("change", () => {
        if (hideInput.checked) {
            hiddenSet.add(index);
        } else {
            hiddenSet.delete(index);
        }
        saveHiddenState();
        createTable();
        modal.classList.add("hidden");
    });

    hideLabel.appendChild(hideInput);
    hideLabel.appendChild(document.createTextNode(`${ownInitials[index]}${suffix} 없애기`));

    modalExtra.appendChild(hideLabel);
}

function setCellColor(td, key, color) {
    if (color) {
        if (td) td.style.backgroundColor = color;
        saveData[key] = color;
    } else {
        if (td) td.style.backgroundColor = "#ffffff";
        delete saveData[key];
    }
}

function applySelection(color) {
    if (!currentTarget) return;

    pushHistory();

    if (currentTarget.type === "cell") {
        setCellColor(currentTarget.td, currentTarget.td.dataset.key, color);
    } else if (currentTarget.type === "row") {
        const rowIndex = currentTarget.index;
        members.forEach((_, colIndex) => {
            const key = `${rowIndex}-${colIndex}`;
            const td = table.querySelector(`td[data-key="${key}"]`);
            setCellColor(td, key, color);
        });
    } else if (currentTarget.type === "col") {
        const colIndex = currentTarget.index;
        members.forEach((_, rowIndex) => {
            const key = `${rowIndex}-${colIndex}`;
            const td = table.querySelector(`td[data-key="${key}"]`);
            setCellColor(td, key, color);
        });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
    modal.classList.add("hidden");
}

closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }

    if (e.target === saveModal) {
        saveModal.classList.add("hidden");
    }
});

/* ==========================================
   공수 취향표 - 기본 아바타 생성 (SVG)
========================================== */

function defaultAvatar(name, color) {
    const initial = name.charAt(0);
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
            <rect width="160" height="160" fill="${color}" />
            <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
                font-family="Pretendard, Noto Sans KR, sans-serif"
                font-size="64" font-weight="800" fill="#ffffff">${initial}</text>
        </svg>
    `;
    return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
}

/* ==========================================
   공수 취향표 - 그리드 생성
========================================== */

function createLrGrid() {
    lrGrid.innerHTML = "";

    members.forEach((member, index) => {
        const row = document.createElement("div");
        row.className = "lr-row";

        /* 아바타 */
        const avatar = document.createElement("div");
        avatar.className = "lr-avatar";
        avatar.dataset.index = index;

        const img = document.createElement("img");
        img.src = lrData.photos[index] || defaultPhotos[index];
        img.alt = member;
        img.onerror = () => {
            img.onerror = null;
            img.src = defaultAvatar(member, memberColors[index % memberColors.length]);
        };
        avatar.appendChild(img);

        const editHint = document.createElement("div");
        editHint.className = "avatar-edit";
        editHint.textContent = "사진 변경";
        avatar.appendChild(editHint);

        avatar.addEventListener("click", () => {
            currentPhotoIndex = index;
            photoInput.value = "";
            photoInput.click();
        });

        /* 프로필 사진 + 그 아래 "제외하기" 체크박스 */
        const side = document.createElement("div");
        side.className = "lr-side";
        side.appendChild(avatar);

        const excludeLabel = document.createElement("label");
        excludeLabel.className = "lr-exclude";
        excludeLabel.innerHTML = `<input type="checkbox"><span>${member} 제외하기</span>`;

        const excludeInput = excludeLabel.querySelector("input");
        excludeInput.checked = !!lrData.excluded[index];
        row.classList.toggle("excluded", excludeInput.checked);

        excludeInput.addEventListener("change", () => {
            lrData.excluded[index] = excludeInput.checked;
            row.classList.toggle("excluded", excludeInput.checked);
            saveLrData();
            updateLrOverflow(row);
        });

        side.appendChild(excludeLabel);
        row.appendChild(side);

        /* 오른쪽 내용 (바 + 텍스트) */
        const content = document.createElement("div");
        content.className = "lr-content";

        const barWrap = document.createElement("div");
        barWrap.className = "lr-bar-wrap";

        const labelL = document.createElement("span");
        labelL.className = "lr-label-l";
        labelL.textContent = "L";

        const bar = document.createElement("div");
        bar.className = "lr-bar";
        bar.dataset.index = index;

        const filledCells = lrData.cells[index] || [];

        for (let c = 0; c < LR_CELL_COUNT; c++) {
            const cell = document.createElement("div");
            cell.className = "lr-cell";
            cell.dataset.cell = c;

            if (filledCells[c]) {
                cell.classList.add("filled");
            }

            cell.addEventListener("click", () => {
                toggleLrCell(index, c, cell);
            });

            bar.appendChild(cell);
        }

        const labelR = document.createElement("span");
        labelR.className = "lr-label-r";
        labelR.textContent = "R";

        barWrap.appendChild(labelL);
        barWrap.appendChild(bar);
        barWrap.appendChild(labelR);

        const textWrap = document.createElement("div");
        textWrap.className = "lr-text-wrap";

        const text = document.createElement("textarea");
        text.className = "lr-text";
        text.rows = 5;
        text.maxLength = 150;
        text.placeholder = "자유롭게 적어보세요";
        text.value = lrData.texts[index] || "";
        text.dataset.index = index;

        const charCount = document.createElement("span");
        charCount.className = "lr-char-count";
        charCount.textContent = `${text.value.length}/150`;

        text.addEventListener("input", () => {
            lrData.texts[index] = text.value;
            charCount.textContent = `${text.value.length}/150`;
            saveLrData();
            updateLrOverflow(row);
        });

        textWrap.appendChild(text);
        textWrap.appendChild(charCount);

        /* 글자 크기 조절 */
        const size = lrData.fontSizes[index] || LR_FONT_DEFAULT;
        text.style.setProperty("--fs", size);

        const sizeCtrl = document.createElement("div");
        sizeCtrl.className = "lr-font-ctrl";
        sizeCtrl.innerHTML = `
            <span class="lr-font-s">가</span>
            <input type="range" min="${LR_FONT_MIN}" max="${LR_FONT_MAX}" value="${size}" aria-label="${member} 글자 크기">
            <span class="lr-font-l">가</span>
            <span class="lr-font-val">${size}px</span>
        `;

        const sizeInput = sizeCtrl.querySelector("input");
        const valLabel = sizeCtrl.querySelector(".lr-font-val");

        sizeInput.addEventListener("input", () => {
            const v = Number(sizeInput.value);
            text.style.setProperty("--fs", v);
            valLabel.textContent = `${v}px`;
            lrData.fontSizes[index] = v;
            saveLrData();
            updateLrOverflow(row);
        });

        content.appendChild(barWrap);
        content.appendChild(textWrap);
        content.appendChild(sizeCtrl);

        const warn = document.createElement("div");
        warn.className = "lr-warn";
        warn.textContent = "글이 칸을 넘어서 이미지에서 잘려요. 글자 크기나 글을 줄여주세요.";
        content.appendChild(warn);

        row.appendChild(content);

        lrGrid.appendChild(row);
    });

    updateLrScale();
}

/* 이 멤버 칸의 글이 넘치는지(= 저장 이미지에서 잘리는지) 확인해서 경고를 켜고 끈다.
   탭이 숨겨져 있으면 크기를 잴 수 없으므로 건너뛴다. */
function updateLrOverflow(row) {
    /* 저장 이미지에서 빠지는(제외한) 멤버는 잘림 걱정이 없으므로 경고하지 않는다 */
    if (row.classList.contains("excluded")) {
        row.classList.remove("overflow");
        return false;
    }

    const ta = row.querySelector(".lr-text");
    if (!ta || !ta.clientHeight) return false;

    const over = ta.scrollHeight > ta.clientHeight + 1;
    row.classList.toggle("overflow", over);
    return over;
}

/* 모바일에서는 입력칸이 PC 저장 레이아웃보다 좁으므로,
   폭 비율(k)만큼 글자/칸 크기를 똑같이 줄여서 줄바꿈이 저장 이미지와 같게 만든다.
   PC(축소 배율로 보여주는 경우 포함)는 레이아웃 폭이 항상 같아 k = 1. */
function updateLrScale() {
    if (!lrGrid || captureAreaLr.classList.contains("hidden")) return;

    const screenWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
    let k = 1;

    if (screenWidth <= MOBILE_BREAKPOINT) {
        const wrap = lrGrid.querySelector(".lr-text-wrap");
        if (wrap && wrap.clientWidth) {
            k = wrap.clientWidth / LR_PC_TEXT_WIDTH;
        }
    }

    lrGrid.style.setProperty("--k", k.toFixed(4));
    lrGrid.querySelectorAll(".lr-row").forEach(updateLrOverflow);
}

function toggleLrCell(memberIndex, cellIndex, cellEl) {
    if (!lrData.cells[memberIndex]) {
        lrData.cells[memberIndex] = [];
    }

    lrData.cells[memberIndex][cellIndex] = !lrData.cells[memberIndex][cellIndex];
    cellEl.classList.toggle("filled");

    saveLrData();
}

function saveLrData() {
    localStorage.setItem(LR_STORAGE_KEY, JSON.stringify(lrData));
}

/* 사진 업로드 */
photoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file || currentPhotoIndex === null) return;

    const reader = new FileReader();

    reader.onload = () => {
        lrData.photos[currentPhotoIndex] = reader.result;
        saveLrData();

        const avatarEl = lrGrid.querySelector(`.lr-avatar[data-index="${currentPhotoIndex}"] img`);
        if (avatarEl) {
            avatarEl.src = reader.result;
        }
    };

    reader.readAsDataURL(file);
});

/* ==========================================
   초기화
========================================== */

resetBtn.addEventListener("click", () => {
    if (!confirm("현재 화면의 모든 선택을 초기화할까요?")) return;

    if (currentTab === "rps") {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(HIDDEN_KEY);
        saveData = {};
        hiddenRows = new Set();
        hiddenCols = new Set();
        historyStack = [];
        redoStack = [];
        updateNavButtons();
        createTable();
    } else {
        localStorage.removeItem(LR_STORAGE_KEY);
        lrData = { texts: {}, cells: {}, photos: {}, fontSizes: {}, excluded: {} };
        createLrGrid();
    }
});

/* ==========================================
   이미지 저장
========================================== */

/* ==========================================
   알페스 저장 이미지 - 셀 개수에 맞춰 표 폭/여백 조정
   멤버를 숨겨서 열이 줄어들면, 표가 이미지 폭에 맞춰 늘어나 셀이 넓어지는 대신
   "원래 셀 크기"를 유지하고 이미지 폭과 여백이 같이 줄어들게 한다.
   (저장할 때 복제된 문서에서만 적용하고, 실제 화면은 건드리지 않는다)
   단, 아래 호감도 범례(OTP~지뢰)와 날짜가 줄바꿈되거나 잘리지 않도록
   이미지 폭이 그 이하로는 줄어들지 않는다.
========================================== */

const RPS_FULL_TABLE_WIDTH = 1180;   // 멤버 전원 표시 시 표 폭 (style.css .table-clip max-width)
const RPS_HEADER_COL_WIDTH = 116;    // PC 왼쪽 이름 칸 폭 (style.css --header-col-width)
const RPS_FULL_SIDE_MARGIN = 60;     // 전원 표시 시 좌우 여백
const RPS_FULL_GAP_BELOW_LOGO = 72;  // 전원 표시 시 로고~표 간격 (style.css title-block margin-bottom)
const RPS_FULL_PAD_BOTTOM = 40;      // 전원 표시 시 아래 여백
const RPS_MIN_MARGIN_SCALE = 0.6;    // 열이 아주 적어도 여백은 이 비율 밑으로는 안 줄인다
const RPS_LOGO_WIDTH = 300;          // style.css .logo 폭
const RPS_DATE_GAP = 24;             // 로고~날짜 간격
const RPS_GAP_REDUCE = 14;           // 로고~표 간격을 줄이는 양(px). 클수록 표가 로고에 가까워진다 (위쪽 여백은 그대로)

function fitRpsCaptureToCells(doc, area) {
    const table = doc.getElementById("chartTable");
    const firstRow = table && table.rows[0];
    if (!firstRow) return;

    const cols = firstRow.cells.length - 1; // 맨 왼쪽 빈 칸 제외
    if (cols < 1) return;

    /* 셀 하나의 원래 폭 = 전원(12명) 표시 때의 셀 폭 */
    const cellW = (RPS_FULL_TABLE_WIDTH - RPS_HEADER_COL_WIDTH) / members.length;
    const tableW = RPS_HEADER_COL_WIDTH + cols * cellW;

    /* 열이 적을수록 여백도 비례해서 줄인다 */
    const s = Math.min(1, Math.max(RPS_MIN_MARGIN_SCALE, tableW / RPS_FULL_TABLE_WIDTH));
    const side = RPS_FULL_SIDE_MARGIN * s;

    /* 범례가 한 줄로 다 들어가야 하는 최소 폭 */
    let legendW = 0;
    const legend = doc.getElementById("legendRps");
    if (legend) {
        const items = [...legend.children];
        legendW = items.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0)
            + 24 * Math.max(0, items.length - 1) + 8;
    }

    /* 날짜가 로고 오른쪽에 들어갈 최소 폭 (로고는 가운데 고정이라 양쪽 모두 필요) */
    let dateW = 0;
    const dateEl = area.querySelector(".chart-date");
    const h1 = area.querySelector("h1");
    if (dateEl && h1 && dateEl.textContent.trim()) {
        dateW = RPS_LOGO_WIDTH + 2 * (RPS_DATE_GAP + h1.getBoundingClientRect().width);
    }

    const contentW = Math.max(tableW, legendW, dateW);

    area.style.width = `${Math.round(contentW + 2 * side)}px`;
    area.style.paddingLeft = `${side}px`;
    area.style.paddingRight = `${side}px`;

    const clip = table.closest(".table-clip");
    if (clip) {
        clip.style.width = `${tableW}px`;
        clip.style.maxWidth = "none";
        clip.style.margin = "0 auto";
    }

    /* 위쪽 여백 = 로고~표 간격 (로고 그림의 투명 여백 보정값은 그대로 유지) */
    const gap = RPS_FULL_GAP_BELOW_LOGO * s;
    const block = area.querySelector(".title-block");
    if (block) block.style.marginBottom = `${Math.max(0, gap - RPS_GAP_REDUCE * s)}px`;

    const basePadTop = parseFloat(area.style.getPropertyValue("--rps-pad-top"));
    const padOffset = Number.isFinite(basePadTop) ? basePadTop - RPS_FULL_GAP_BELOW_LOGO : 6;
    area.style.paddingTop = `${gap + padOffset}px`; /* 위쪽 여백은 그대로 (로고 위치 유지) */
    area.style.paddingBottom = `${RPS_FULL_PAD_BOTTOM * s}px`;
}

/* ==========================================
   공수 저장 이미지 - 제외한 멤버를 빼고, 남은 인원에 맞게 배치/폭 조정
   - 남은 인원 수에 따라 "몇 열로 놓을지"를 이미지 비율이 4:3에 가깝도록 고른다.
   - 열마다 인원이 고르게 나뉘도록(예: 10명 -> 4-3-3) 위에서 아래, 왼쪽에서 오른쪽 순서로 채운다.
   - 칸 크기는 그대로 두고 이미지 폭이 열 수에 맞게 줄어서, 빈 여백이 생기지 않는다.
   - 제목과 날짜가 들어갈 최소 폭은 항상 확보한다.
   (저장할 때 복제된 문서에서만 적용하고, 실제 화면은 건드리지 않는다)
========================================== */

const LR_COL_WIDTH = 544;       // 한 열의 폭 = (1820 - 좌우 여백 128 - 열 간격 30x2) / 3
const LR_COL_GAP = 30;          // style.css .lr-grid 열 간격
const LR_SIDE_PADDING = 64;     // style.css 공수 좌우 여백
const LR_EST_ROW_HEIGHT = 244;  // 멤버 한 줄 높이(바 38 + 간격 14 + 입력칸 190 + 여유)
const LR_EST_ROW_GAP = 34;      // style.css .lr-grid 행 간격
const LR_EST_FIXED_HEIGHT = 290; // 위 여백 72 + 제목 약 58 + 제목 아래 78 + 아이디 43 + 아래 여백 40
const LR_TARGET_ASPECT = 4 / 3;
const LR_MAX_COLS = 4;
const LR_DATE_GAP = 18;         // 제목~날짜 간격

function chooseLrColumns(n) {
    let best = 1;
    let bestScore = Infinity;

    for (let c = 1; c <= Math.min(n, LR_MAX_COLS); c++) {
        const r = Math.ceil(n / c);
        const w = 2 * LR_SIDE_PADDING + c * LR_COL_WIDTH + (c - 1) * LR_COL_GAP;
        const h = LR_EST_FIXED_HEIGHT + r * LR_EST_ROW_HEIGHT + (r - 1) * LR_EST_ROW_GAP;
        const score = Math.abs(Math.log((w / h) / LR_TARGET_ASPECT));

        if (score < bestScore - 1e-9) {
            best = c;
            bestScore = score;
        }
    }

    return best;
}

function fitLrCaptureToMembers(doc, area) {
    const grid = doc.getElementById("lrGrid");
    if (!grid) return;

    const rows = [...grid.querySelectorAll(".lr-row")];
    const kept = rows.filter((r) => !r.classList.contains("excluded"));
    rows.filter((r) => r.classList.contains("excluded")).forEach((r) => r.remove());

    const n = kept.length;
    if (!n) return;

    const cols = chooseLrColumns(n);
    const base = Math.floor(n / cols);
    const extra = n % cols;

    let idx = 0;
    let maxRows = 0;

    for (let c = 0; c < cols; c++) {
        const count = base + (c < extra ? 1 : 0);
        maxRows = Math.max(maxRows, count);

        for (let r = 0; r < count; r++) {
            const row = kept[idx++];
            row.style.gridColumn = String(c + 1);
            row.style.gridRow = String(r + 1);
        }
    }

    grid.style.gridTemplateColumns = `repeat(${cols}, ${LR_COL_WIDTH}px)`;
    grid.style.gridTemplateRows = `repeat(${maxRows}, auto)`;
    grid.style.justifyContent = "center";

    const gridW = cols * LR_COL_WIDTH + (cols - 1) * LR_COL_GAP;

    /* 제목은 가운데, 날짜는 제목 오른쪽 옆이므로 양쪽에 날짜 폭만큼 여유가 있어야 잘리지 않는다 */
    let titleNeed = 0;
    const h1 = area.querySelector("h1");
    const dateEl = area.querySelector(".chart-date");

    if (h1) {
        const titleW = h1.getBoundingClientRect().width;
        const dateW = dateEl && dateEl.textContent.trim()
            ? dateEl.getBoundingClientRect().width + LR_DATE_GAP
            : 0;
        titleNeed = titleW + 2 * dateW;
    }

    area.style.width = `${Math.round(Math.max(gridW, titleNeed) + 2 * LR_SIDE_PADDING)}px`;
}

saveBtn.addEventListener("click", async () => {
    /* 공수 취향표: 글이 넘쳐서 잘리는 멤버가 있으면 저장 전에 알려준다. */
    if (currentTab === "lr") {
        if (members.every((_, i) => lrData.excluded[i])) {
            alert("저장할 멤버가 없어요. '제외하기' 체크를 하나 이상 풀어주세요.");
            return;
        }

        updateLrScale();
        const overflowed = [...lrGrid.querySelectorAll(".lr-row")]
            .map((r, i) => (r.classList.contains("overflow") ? members[i] : null))
            .filter(Boolean);

        if (overflowed.length &&
            !confirm(`${overflowed.join(", ")} 칸의 글이 넘쳐서 이미지에서 일부 잘려요.\n그래도 저장할까요?`)) {
            return;
        }
    }

    const buttonWrap = document.querySelector(".button-wrap");
    const tabWrap = document.querySelector(".tab-wrap");
    const area = currentTab === "rps" ? captureAreaRps : captureAreaLr;

    buttonWrap.style.display = "none";
    tabWrap.style.display = "none";
    dateToggleWrap.style.display = "none";

    /* 안내 문구, 이전/이후 버튼은 이미지에는 나오지 않도록 캡처 중에만 숨김 */
    area.classList.add("capturing");

    /* 화면(특히 모바일)에 적용돼 있던 축소/반응형 스타일을 잠시 걷어내고,
       항상 PC 버전과 동일한 1100px 레이아웃으로 저장되도록 한다. */
    const prevTransform = area.style.transform;
    area.style.transform = "none";

    try {
        const canvas = await html2canvas(area, {
            backgroundColor: "#ffffff",
            scale: 4,
            useCORS: true,
            logging: false,
            windowWidth: getCaptureWidth(currentTab),
            windowHeight: Math.max(area.scrollHeight, 1600),
            /*
             * html2canvas는 textarea 안의 줄바꿈/자동 줄바꿈을 제대로
             * 그리지 못해서(한 줄로만 렌더링되며 잘려 보임), 캡처용으로
             * 복제된 문서 안에서만 textarea를 똑같이 생긴 div로 바꿔치기한다.
             * 실제 화면의 textarea(입력 가능 상태)는 건드리지 않는다.
             */
            onclone: (clonedDoc) => {
                /* 공수: 제외한 멤버를 빼고 남은 인원에 맞게 배치/폭 조정 */
                if (currentTab === "lr") {
                    const clonedLr = clonedDoc.getElementById("captureAreaLr");
                    if (clonedLr) fitLrCaptureToMembers(clonedDoc, clonedLr);
                }

                /* 알페스: 셀 개수에 맞춰 이미지 폭/여백을 조정 (셀 크기는 원래대로 유지) */
                if (currentTab === "rps") {
                    const clonedRps = clonedDoc.getElementById("captureArea");
                    if (clonedRps) fitRpsCaptureToCells(clonedDoc, clonedRps);
                }

                /* 저장 이미지는 항상 PC 레이아웃 기준: 모바일용 보정(k)과 경고 표시는 걷어낸다. */
                const clonedGrid = clonedDoc.getElementById("lrGrid");
                if (clonedGrid) clonedGrid.style.setProperty("--k", "1");
                clonedDoc.querySelectorAll(".lr-row.overflow").forEach((r) => r.classList.remove("overflow"));

                clonedDoc.querySelectorAll(".lr-text").forEach((ta) => {
                    const div = clonedDoc.createElement("div");
                    div.className = "lr-text";
                    div.style.whiteSpace = "pre-wrap";
                    div.style.wordBreak = "break-word";
                    div.style.overflow = "hidden";
                    div.style.setProperty("--fs", ta.style.getPropertyValue("--fs"));
                    div.textContent = ta.value;
                    ta.replaceWith(div);
                });
            }
        });

        /*
         * data: URL 대신 Blob URL을 사용한다.
         * 표가 커지고 고화질(scale 4)로 캡처하면서 이미지 용량이 커졌는데,
         * 아이폰 사파리는 큰 data: URL을 <a download>로 다운로드할 때
         * "다운로드하시겠습니까?" 확인창까지만 뜨고 실제 저장은 안 되는
         * 경우가 있다. Blob URL은 이런 용량 제한 없이 정상적인
         * 다운로드(하단 진행 표시 → 다운로드 항목 저장)로 이어진다.
         */
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));

        if (!blob) {
            throw new Error("이미지 변환에 실패했습니다.");
        }

        if (currentBlobUrl) {
            URL.revokeObjectURL(currentBlobUrl);
        }
        currentBlobUrl = URL.createObjectURL(blob);

        previewImage.src = currentBlobUrl;
        saveModal.classList.remove("hidden");

        const fileLabel = currentTab === "rps" ? "알페스_취향표" : "공수_취향표";

        const link = document.createElement("a");
        link.href = currentBlobUrl;
        link.download = `데못죽_${fileLabel}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error(error);
        alert("이미지 저장 중 문제가 발생했습니다.");
    } finally {
        area.classList.remove("capturing");
        area.style.transform = prevTransform;
        buttonWrap.style.display = "flex";
        tabWrap.style.display = "flex";
        dateToggleWrap.style.display = "flex";
    }
});

closeSaveModal.addEventListener("click", () => {
    saveModal.classList.add("hidden");
});

/* ==========================================
   ESC
========================================== */

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.classList.add("hidden");
        saveModal.classList.add("hidden");
    }
});

/* ==========================================
   모바일 자동 축소
========================================== */

function fitCaptureArea() {
    fitCaptureAreaLayout();
    updateLrScale();
}

function fitCaptureAreaLayout() {
    const area = currentTab === "rps" ? captureAreaRps : captureAreaLr;
    const wrap = scaleWrap;

    if (!area || !wrap) return;

    const screenWidth = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth
    );

    if (screenWidth <= MOBILE_BREAKPOINT) {
        /* 모바일: 축소 대신 CSS 반응형 레이아웃을 그대로 사용하고,
           세로로 길어진 내용은 화면을 드래그해서 내려보는 방식으로 확인한다. */
        area.style.transform = "none";
        area.style.transformOrigin = "";
        wrap.style.width = "";
        wrap.style.height = "";
        return;
    }

    const captureWidth = getCaptureWidth(currentTab);
    const scale = Math.min(1, screenWidth / captureWidth);

    area.style.transformOrigin = "top left";
    area.style.transform = `scale(${scale})`;

    wrap.style.width = `${captureWidth * scale}px`;
    wrap.style.height = `${area.scrollHeight * scale}px`;
}

fitCaptureArea();

window.addEventListener("load", fitCaptureArea);
window.addEventListener("resize", fitCaptureArea);

window.addEventListener("orientationchange", () => {
    setTimeout(fitCaptureArea, 200);
});


/* ==========================================
   알페스 취향표 - 표 아래 둥근 스크롤바
   (기본 스크롤바는 표에 붙어 보여서 숨기고, 표와 간격을 둔 별도 막대로 대신한다)
========================================== */

(function setupTableScrollbar() {
    const scroller = document.getElementById("tableScroll");
    const bar = document.getElementById("tableScrollbar");
    const thumb = document.getElementById("tableScrollbarThumb");

    if (!scroller || !bar || !thumb) return;

    function maxScroll() {
        return scroller.scrollWidth - scroller.clientWidth;
    }

    function update() {
        const max = maxScroll();

        if (max <= 1) {
            bar.classList.remove("active");
            return;
        }

        bar.classList.add("active");

        const barWidth = bar.clientWidth;
        const thumbWidth = Math.max(40, barWidth * (scroller.clientWidth / scroller.scrollWidth));
        const x = (scroller.scrollLeft / max) * (barWidth - thumbWidth);

        thumb.style.width = `${thumbWidth}px`;
        thumb.style.transform = `translateX(${x}px)`;
    }

    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("load", update);

    if (window.ResizeObserver) {
        const ro = new ResizeObserver(update);
        ro.observe(scroller);
        ro.observe(table);
    }

    /* 막대 드래그 */
    let dragging = false;
    let startX = 0;
    let startLeft = 0;

    thumb.addEventListener("pointerdown", (e) => {
        dragging = true;
        startX = e.clientX;
        startLeft = scroller.scrollLeft;
        thumb.setPointerCapture(e.pointerId);
        e.preventDefault();
    });

    thumb.addEventListener("pointermove", (e) => {
        if (!dragging) return;
        const track = bar.clientWidth - thumb.offsetWidth;
        if (track <= 0) return;
        scroller.scrollLeft = startLeft + (e.clientX - startX) * (maxScroll() / track);
    });

    const stopDrag = () => { dragging = false; };
    thumb.addEventListener("pointerup", stopDrag);
    thumb.addEventListener("pointercancel", stopDrag);

    /* 막대의 빈 곳을 누르면 그 위치로 이동 */
    bar.addEventListener("pointerdown", (e) => {
        if (e.target === thumb) return;
        const rect = bar.getBoundingClientRect();
        const track = rect.width - thumb.offsetWidth;
        if (track <= 0) return;
        const ratio = (e.clientX - rect.left - thumb.offsetWidth / 2) / track;
        scroller.scrollLeft = Math.min(1, Math.max(0, ratio)) * maxScroll();
    });

    update();
})();


/* ==========================================
   알페스 저장 이미지 - 로고 시각적 가운데 맞춤
   로고는 사각형이 아니라서 "계산상 가운데"여도 눈에는 한쪽으로 치우쳐 보인다.
   그림의 글자(잉크)가 몰려 있는 무게중심을 재서, 저장할 때만 그만큼 살짝 옮겨 가운데로 보이게 한다.
   (이미지를 읽을 수 없는 환경이면 조용히 건너뛰고 원래 위치를 쓴다)
========================================== */

const LOGO_OPTICAL_STRENGTH = 0.7; // 1이면 무게중심을 정확히 가운데로, 0이면 보정 없음
const LOGO_OPTICAL_MAX_SHIFT = 14; // 보정 한계(px)

(function setupLogoOpticalCenter() {
    const logo = document.querySelector("#captureArea .logo");
    if (!logo) return;

    function measure() {
        try {
            const w = logo.naturalWidth;
            const h = logo.naturalHeight;
            if (!w || !h) return;

            const scale = Math.min(1, 400 / w);
            const cw = Math.max(1, Math.round(w * scale));
            const ch = Math.max(1, Math.round(h * scale));

            const canvas = document.createElement("canvas");
            canvas.width = cw;
            canvas.height = ch;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(logo, 0, 0, cw, ch);
            const data = ctx.getImageData(0, 0, cw, ch).data;

            let sum = 0;
            let sumX = 0;
            let inkTop = ch;   // 그림이 실제로 그려진 맨 위 줄
            let inkBottom = 0; // 그림이 실제로 그려진 맨 아래 줄

            for (let y = 0; y < ch; y++) {
                for (let x = 0; x < cw; x++) {
                    const i = (y * cw + x) * 4;
                    const alpha = data[i + 3] / 255;
                    const dark = 1 - (data[i] + data[i + 1] + data[i + 2]) / 765;
                    const weight = alpha * dark;
                    sum += weight;
                    sumX += weight * (x + 0.5);
                    if (alpha > 0.3) {
                        if (y < inkTop) inkTop = y;
                        if (y > inkBottom) inkBottom = y;
                    }
                }
            }

            if (sum <= 0) return;

            const centroid = sumX / sum;
            const offsetRatio = (cw / 2 - centroid) / cw;
            const logoDisplayWidth = 300; // style.css의 .logo 폭과 같아야 한다
            let shift = offsetRatio * logoDisplayWidth * LOGO_OPTICAL_STRENGTH;
            shift = Math.max(-LOGO_OPTICAL_MAX_SHIFT, Math.min(LOGO_OPTICAL_MAX_SHIFT, shift));

            logo.style.setProperty("--logo-shift", `${shift.toFixed(1)}px`);

            /* 로고 그림 위/아래의 빈 여백(px). 그림 파일은 글자 둘레에 투명 여백이 있어서
               "그림 상자"의 가장자리와 "눈에 보이는 글자"의 가장자리가 다르다. */
            const logoDisplayHeight = logoDisplayWidth * (h / w);
            const clampGap = (v) => Math.max(0, Math.min(60, v));
            const inkGapBottom = clampGap(((ch - 1 - inkBottom) / ch) * logoDisplayHeight);
            const inkGapTop = clampGap((inkTop / ch) * logoDisplayHeight);

            /* 1) 날짜 아랫선 = 로고 글자의 아랫선.
               이 값은 로고의 "형제"인 날짜(h1)가 읽어야 하므로 반드시 부모(.title-block)에 넣는다.
               (로고 자신에게 넣으면 형제에게 전달되지 않아 보정이 0이 되어 날짜가 아래로 내려간다) */
            const block = logo.parentElement;
            if (block) block.style.setProperty("--logo-ink-gap", `${inkGapBottom.toFixed(1)}px`);

            /* 2) 위쪽 여백 = 로고와 표 사이 간격 ("눈에 보이는 글자" 기준으로 같게).
               표 쪽 간격은 CSS의 .title-block margin-bottom(72px) + 로고 아래 투명 여백,
               위쪽은 padding-top + 로고 위 투명 여백이므로 둘이 같아지도록 padding-top을 계산한다.
               로고가 지금보다 최소 6px은 내려오도록 하한(78px)을 둔다. */
            const GAP_BELOW_LOGO = 72; // style.css의 알페스 .title-block margin-bottom과 같아야 한다
            const padTop = Math.max(GAP_BELOW_LOGO + 6, GAP_BELOW_LOGO + inkGapBottom - inkGapTop);
            const area = document.getElementById("captureArea");
            if (area) area.style.setProperty("--rps-pad-top", `${padTop.toFixed(1)}px`);
        } catch (e) {
            /* 캔버스로 읽을 수 없으면 보정 없이 그대로 */
        }
    }

    if (logo.complete) {
        measure();
    } else {
        logo.addEventListener("load", measure);
    }
})();
