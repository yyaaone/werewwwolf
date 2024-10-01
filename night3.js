function playAudio(id) {
    const audioElement = document.getElementById(id);
    audioElement.play();
}
function stopAudio(id) {
    const audioElement = document.getElementById(id);
    audioElement.pause();
    audioElement.currentTime = 0;
}

function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    const messageElement = document.getElementById('message');

    nightAudio.play()
    nightAudio.onended = function() {

        messageElement.textContent = "หมาป่าถึงเวลาโหวตคนที่ต้องการจะกำจัด";
        playAudio('wolf-audio');
    
        const wolfAudio = document.getElementById('wolf-audio');
        wolfAudio.onended = function() {
            messageElement.textContent = "หมาป่าเหลือเวลาโหวตคนที่ต้องการจะกำจัด";
            let timeLeft = 40;
            const countdownInterval = setInterval(() => {
                countdownElement.textContent = timeLeft + ' วินาที';
                if (timeLeft <= 5) {
                    if (timeLeft==5) {
                        playAudio('timeout-audio');
                    }
                    countdownElement.classList.add('red');
                }
                if (timeLeft === 0) {
                    clearInterval(countdownInterval);
                    countdownElement.classList.add('hidden');
    
                    // Change to nurse phase after timeout
                    setTimeout(() => {
                        messageElement.textContent = "พยาบาลถึงเวลาที่ต้องโหวตคนที่ต้องการจะรักษา";
                        playAudio('nurse-audio');
    
                        const nurseAudio = document.getElementById('nurse-audio');
                        nurseAudio.onended = function() {
                            messageElement.textContent = "พยาบาลเหลือเวลาโหวตคนที่ต้องการจะรักษา";
                            let timeLeft = 40;
                            const countdownElement = document.getElementById('countdown');
                            countdownElement.classList.remove('hidden');
                            countdownElement.classList.remove('red');
                            const countdownInterval = setInterval(() => {
                                countdownElement.textContent = timeLeft + ' วินาที';
                                if (timeLeft <= 5) {
                                    if (timeLeft==5) {
                                        playAudio('timeout-audio');
                                    }   
                                    countdownElement.classList.add('red');
                                }
                                if (timeLeft === 0) {
                                    clearInterval(countdownInterval);
                                    countdownElement.classList.add('hidden');
    
                                    // Change to seer phase after timeout
                                    setTimeout(() => {
                                        messageElement.textContent = "ผู้หยั่งรู้ถึงเวลาที่ต้องเลือกคนที่ต้องการจะตรวจสอบ";
                                        playAudio('seer-audio');
    
                                        const seerAudio = document.getElementById('seer-audio');
                                        seerAudio.onended = function() {
                                            messageElement.textContent = "ผู้หยั่งรู้ถึงเวลาตรวจสอบคนที่เลือก";
                                            let timeLeft = 40;
                                            countdownElement.classList.remove('hidden');
                                            countdownElement.classList.remove('red');
                                            const countdownInterval = setInterval(() => {
                                                countdownElement.textContent = timeLeft + ' วินาที';
                                                if (timeLeft <= 5) {
                                                    if (timeLeft==5) {
                                                        playAudio('timeout-audio');
                                                    }   
                                                    countdownElement.classList.add('red');
                                                }
                                                if (timeLeft === 0) {
                                                    clearInterval(countdownInterval);
                                                    countdownElement.classList.add('hidden');
                                                    window.location.href = "mor2.html"
                                                }
                                                timeLeft--;
                                            }, 1000);
                                        };
                                    }, 1000); // Delay for a smooth transition
                                }
                                timeLeft--;
                            }, 1000);
                        };
                    }, 1000); // Delay for a smooth transition
                }
                timeLeft--;
            }, 1000);
        };
    }
    
    // Initial message for wolves
}

window.onload = startCountdown;