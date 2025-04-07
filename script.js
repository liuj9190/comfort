const questions = [
    {
       question: "<span class='red-highlight'>你的安慰是良藥還是毒雞湯？</span><br><span style='font-size: 0.8em; color: #4B5563;'>——精神科醫師教你辨識真正的安慰智慧</span><br><br>當朋友遭遇重大打擊，你會？",
        options: [            
            { text: "要不要我幫你安排心理諮商？", next: 1, score: 3 },
            { text: "我不知道該說什麼，但我會在這裡陪你", next: 1, score: 5 },
            { text: "時間會治癒一切傷痛", next: 1, score: 1 }
        ],
        background: 'images/default-background.jpg'
    },
    {
        question: "當面對無法用言語安慰的痛苦時，你會如何做？",
        options: [
            { text: "保持沉默，因為說什麼都沒用", next:2, score: 1 },           
            { text: "找出生活中微小美好的事物與對方分享", next: 2, score: 5 },
            { text: "分享一個溫暖的擁抱或靜靜陪伴 ", next: 2, score: 3 }
        ],
        background: 'images/background1.jpg'
    },
    {
        question: "當你無法解決他人的痛苦時，你會",
        options: [
            { text: "感到挫敗並保持距離", next: 3, score: 1 },
            { text: "推薦其他專家協助", next: 3, score: 3 },
            { text: "理解安慰不是修復，而是陪伴 ", next: 3, score: 5 }
        ],
        background: 'images/background2.jpg'
    },
   {
        question: "面對長期痛苦的人，你傾向？",
        options: [
            { text: "成為他與世界保持連結的那條紅線", next: 4, score: 5 },
            { text: "穩定耐心的陪伴", next: 4, score: 3 },
            { text: "提供專業治療方案", next: 4, score: 1 }         
        ],
        background: 'images/background3.jpg'
    },
   {
        question: " 面對無法改變的絕境，你認為安慰應該：",
        options: [
            { text: "轉移注意力到其他事物 ", next: -1, score: 3 },
            { text: "幫助對方接受現實", next: -1, score: 1 },            
            { text: "讓痛苦被看見，但不被淹沒", next: -1, score: 5 }
        ],
        background: 'images/background4.jpg'
    },
   
];

// 當前問題索引
let currentQuestion = 0;  // 保存當前問題的索引，初始值為 0，表示第一個問題。
let totalScore = 0;

// 初始化問題和選項，並按三層布局顯示
function loadQuestion() {
    let questionObj = questions[currentQuestion];  // 取得當前問題
    let questionContainer = document.getElementById('question');  // 顯示問題的容器
    let topOptionsContainer = document.getElementById('options-top');  // 顯示選項的頂部容器
    let middleOptionsContainer = document.getElementById('options-middle');   // 顯示選項的中部容器
    let bottomOptionsContainer = document.getElementById('options-bottom');   // 顯示選項的底部容器

    // 檢查是否是結果頁面
    if (questionObj.result) {
        showProduct(questionObj);   // 如果是結果頁面，顯示產品內容
        return;
    }

    // 更改背景圖片，根據問題設定的背景
    changeBackground(questionObj.background);

    // 顯示問題（使用 innerHTML 確保 HTML 標籤被解析）
    questionContainer.innerHTML = questionObj.question;

    // 清空舊的選項，確保顯示新問題的選項
    topOptionsContainer.innerHTML = '';
    middleOptionsContainer.innerHTML = '';
    bottomOptionsContainer.innerHTML = '';

    // 創建選項按鈕並將它們按順序分配到三層
    questionObj.options.forEach((option, index) => {
        let button = document.createElement('button');   // 創建一個按鈕元素
        button.innerText = option.text;   // 設置按鈕文本
        button.onclick = () => chooseOption(option.next, option.score);   // 點擊按鈕後執行選擇下一個問題

        // 將選項按順序分配到不同的容器
        if (index % 3 === 0) {
            topOptionsContainer.appendChild(button);   // 第一個選項進入頂部容器
        } else if (index % 3 === 1) {
            middleOptionsContainer.appendChild(button);   // 第二個選項進入中部容器
        } else {
            bottomOptionsContainer.appendChild(button);   // 第三個選項進入底部容器
        }
    });
}



function chooseOption(nextQuestion, score) {
    totalScore += score; // 直接加上傳入的分數
    console.log("當前選擇的分數：" + score + "，累計總分：" + totalScore);
    
    if (nextQuestion === -1) {
        showResult();
    } else {
        currentQuestion = nextQuestion;
        loadQuestion();
    }
}

// 顯示最終結果
function showResult() {
    console.log("進入結果頁面，總分：" + totalScore);  // 確認是否進入結果頁面
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('product-container').style.display = 'block';

    // 隱藏所有背景圖片
    let backgroundImages = document.getElementsByClassName('background-image');
    for (let i = 0; i < backgroundImages.length; i++) {
        backgroundImages[i].style.display = 'none';  // 隱藏每個背景圖片元素
    }

  let productTitle = "<span style='font-size: 1.2em; color: #c0392b;'>【測驗結果】<br></span><br>";
let resultText = "";

if (totalScore <= 11) {
    resultText = "<strong style='font-size: 1em; color: #1E40AF;'>你習慣用解決問題的方式提供幫助，但有時忽略情緒接納的重要性。<br></strong><br>" + 
                 "<span style='font-size: 0.8em; color: #4B5563;'>建議：試著練習「不急着給答案」，而是先肯定對方的情緒。</span>";
} else if (totalScore <= 18) {
    resultText = "<strong style='font-size: 1em; color: #1E40AF;'>你善於陪伴，能讓他人感覺不孤單，但有時會猶豫是否介入太多。<br></strong><br>" + 
                 "<span style='font-size: 0.8em; color: #4B5563;'>建議：可以更主動表達關心，並練習既溫暖又真摯的陪伴方式。</span>";
} else {
    resultText = "<strong style='font-size: 1em; color: #1E40AF;'>你深刻理解安慰的本質，能陪伴他人面對無法修復的痛苦。<br></strong><br>" + 
                 "<span style='font-size: 0.8em; color: #4B5563;'>建議：你的存在本身就是一種安慰，記得也要照顧自己的情緒能量。</span>";
} 

    // 顯示產品信息
    document.getElementById('product-title').innerHTML = `<span class="red-highlight">${productTitle}</span>${resultText}`;
    let productImage = document.getElementById('product-image');
    productImage.src = `images/005.jpg`;  // 結果頁面的圖片
    productImage.alt = resultText;
    productImage.parentElement.href = "https://www.morningstar.com.tw/bookinfo.aspx?bookno=0714198";  // 結果頁面的鏈接 
    document.getElementById('click-hint').style.display = 'block'; // 显示提示文本

    // 讓產品名稱的文字變大
    let productDescription = document.getElementById('product-description');
    productDescription.style.fontSize = '1.2em'; // 調整字體大小
    productDescription.style.fontWeight = 'bold'; // 讓文字更醒目
    
}

// 動態更改背景圖片
function changeBackground(imagePath) {
    let backgroundImage = document.getElementById('background-image');
    if (imagePath && backgroundImage) {
        backgroundImage.src = imagePath;  // 動態更改圖片路徑
        backgroundImage.style.display = 'block';  // 確保圖片顯示
    } else {
        backgroundImage.style.display = 'none';  // 隱藏圖片
    }
}

// 重新開始
function restart() {
    currentQuestion = 0;   // 將當前問題重置為第一個問題
    totalScore = 0;        // 重置分數
    document.getElementById('product-container').style.display = 'none';   // 隱藏產品頁面
    document.getElementById('question-container').style.display = 'block';   // 顯示問題頁面
    loadQuestion();        // 加載第一個問題
}

// 頁面載入時自動加載第一個問題
loadQuestion();