/* ==========================================
   TeSTAR 취향표
========================================== */

/* 표(행/열 헤더)에 표시할 멤버 이름 */
const members = [
    "배세진",
    "류청우",
    "선아현",
    "이세진",
    "박문대",
    "차유진",
    "김래빈"
];

/* 멤버별 본인 이니셜 (닉네임, 행/열 숨기기 문구에 사용) */
const ownInitials = ["배", "청", "앟", "큰", "문", "윶", "랩"];

/* 멤버별 기본 아바타 색상 (사진 로드 실패 시 대체용) - 보라/핑크/노랑 기본색을 그라데이션으로 배치 */
const memberColors = [
    "#ae8ab8",
    "#c698bb",
    "#dfa5bf",
    "#f7b3c2",
    "#f8c3b4",
    "#f9d4a6",
    "#fae498"
];

/* 멤버별 기본 프로필 사진 (members 배열과 순서 동일) */
const defaultPhotos = [
    "assets/m1.png",
    "assets/m2.png",
    "assets/m3.png",
    "assets/m4.png",
    "assets/m5.png",
    "assets/m6.png",
    "assets/m7.png"
];

/*
 * 표에 표시할 커플명.
 * [행 멤버][열 멤버] 순서.
 * 대각선(본인조합)은 각 멤버 본인의 이니셜을 두 번 합쳐서 만들었어요.
 * 이니셜(배·청·앟·큰·문·윶·랩)을 그대로 이어붙인 기본값이니,
 * 원하는 조합명으로 자유롭게 바꿔서 쓰시면 돼요.
 */
const pairNames = [
    ["배배", "배청", "배앟", "배큰", "배문", "배윶", "배랩"],
    ["청배", "청청", "청앟", "청큰", "청문", "청윶", "청랩"],
    ["앟배", "앟청", "앟앟", "앟큰", "앟문", "앟윶", "앟랩"],
    ["큰배", "큰청", "큰앟", "큰큰", "큰문", "큰윶", "큰랩"],
    ["댕뵤", "문국", "문앟", "문큰", "문문", "문윶", "문랩"],
    ["윶배", "윶청", "윶앟", "윶큰", "윶문", "윶윶", "윶랩"],
    ["랩배", "랩청", "랩앟", "랩큰", "랩문", "랩윶", "랩랩"]
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
const CUSTOM_COLOR_KEY = "testar-custom-colors";
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

const STORAGE_KEY = "testar-tetpes-rps";
const LR_STORAGE_KEY = "testar-lr-rps";
const LR_CELL_COUNT = 12;

/* 행/열 개별 숨기기 상태 (멤버 인덱스 기준, rows/cols 따로 관리) */
const HIDDEN_KEY = "testar-hidden-members";
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
const SELF_PAIR_KEY = "testar-include-selfpair";
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
   - 텟페스 취향표: 기존과 동일한 1100px
   - 공수 취향표: 가로가 더 길고 세로는 더 짧게 나오도록 1500px로 넓힘
   CSS의 #captureArea / #captureAreaLr width 값과 항상 같아야 한다. */
const CAPTURE_WIDTH = {
    rps: 1100,
    lr: 1500
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
    photos: {}
};

const GUIDE_TEXT = {
    rps: [
        "셀을 선택하여 호감도를 표시해주세요.",
        "멤버 이름을 누르면 줄 전체선택/숨기기가 가능해요."
    ],
    lr: [
        "L-R 사이 원하는 부분의 칸을 선택하고, 아래 칸에 자유롭게 적어보세요.",
        "각 멤버의 프로필을 누르면 사진 변경이 가능해요."
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
   데못죽 사이트가 아직 배포 전이라면 아래 주소를 실제 배포 주소로 바꿔주세요.
========================================== */

const CURRENT_GROUP = "testar";

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
   텟페스 취향표 - 표 생성
========================================== */

function createTable() {
    table.innerHTML = "";

    const visibleColIndexes = members.map((_, i) => i).filter(i => !hiddenCols.has(i));
    const visibleRowIndexes = members.map((_, i) => i).filter(i => !hiddenRows.has(i));

    const head = document.createElement("tr");
    const empty = document.createElement("th");
    empty.className = "corner";
    head.appendChild(empty);

    visibleColIndexes.forEach(colIndex => {
        const th = document.createElement("th");
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
   텟페스 취향표 - 이전/이후 (실행 취소)
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

        row.appendChild(avatar);

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
            autoResizeTextarea(text);
        });

        textWrap.appendChild(text);
        textWrap.appendChild(charCount);

        content.appendChild(barWrap);
        content.appendChild(textWrap);

        row.appendChild(content);

        lrGrid.appendChild(row);
    });

    /* 저장돼 있던 글이 여러 줄이어도 처음부터 잘리지 않도록,
       모든 칸을 한 번씩 실제 내용 높이에 맞춰준다. */
    lrGrid.querySelectorAll(".lr-text").forEach(autoResizeTextarea);
}

/* 칸에 적은 글이 늘어나면 잘리는 대신 칸 자체가 자연스럽게 늘어나도록.
   grid 행이 auto 높이라 아래 칸들과 겹치지 않고 밀려 내려간다. */
function autoResizeTextarea(el) {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
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
        lrData = { texts: {}, cells: {}, photos: {} };
        createLrGrid();
    }
});

/* ==========================================
   이미지 저장
========================================== */

saveBtn.addEventListener("click", async () => {
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
                clonedDoc.querySelectorAll(".lr-text").forEach((ta) => {
                    const div = clonedDoc.createElement("div");
                    div.className = "lr-text";
                    div.style.whiteSpace = "pre-wrap";
                    div.style.wordBreak = "break-word";
                    div.style.overflow = "hidden";
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

        const fileLabel = currentTab === "rps" ? "텟페스_취향표" : "공수_취향표";

        const link = document.createElement("a");
        link.href = currentBlobUrl;
        link.download = `TeSTAR_${fileLabel}.png`;
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
