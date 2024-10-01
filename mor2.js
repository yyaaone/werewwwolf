window.onload = function() {
    var checkAudio = document.getElementById('checkAudio');
    var talkAudio = document.getElementById('talkAudio');
    var voteAudio = document.getElementById('voteAudio');
    var morningAudio = document.getElementById('morningAudio');
    var timeoutAudio = document.getElementById('timeoutAudio');
    var countdownElement = document.getElementById('countdown');
    var subMessage = document.getElementById('subMessage');
    var timeLeft;
    var countdownInterval;

    document.getElementById("endGameBtn").addEventListener("click", function() {
        window.location.href = "endgame.html";
    });

    morningAudio.play()

    morningAudio.onended = function(){
        
        // ฟังก์ชันอัปเดตการนับถอยหลัง
        function updateTimer(onComplete) {
            var minutes = Math.floor(timeLeft / 60);
            var seconds = timeLeft % 60;
    
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
    
            countdownElement.textContent = minutes + ":" + seconds;
    
            if (timeLeft === 5) {
                countdownElement.classList.add('red');
                timeoutAudio.play();
            }
    
            if (timeLeft === 0) {
                clearInterval(countdownInterval);
                onComplete();
            }
    
            timeLeft--;
        }
    
        // ฟังก์ชันเริ่มนับถอยหลัง
        function startCountdown(seconds, onComplete) {
            timeLeft = seconds;
            countdownElement.classList.remove('red');
            countdownInterval = setInterval(function() {
                updateTimer(onComplete);
            }, 1000);
        }
    
        // ฟังก์ชันสำหรับการเล่นเสียงและการเปลี่ยนเฟส
        function playAudioAndCountdown(audioElement, countdownSeconds, nextMessage, nextAudio, redirectUrl) {
            audioElement.play();
            audioElement.onended = function() {
                if (countdownSeconds) {
                    startCountdown(countdownSeconds, function() {
                        if (nextMessage) subMessage.textContent = nextMessage;
                        if (nextAudio) playAudioAndCountdown(nextAudio, countdownSeconds, null, null, redirectUrl);
                        else if (redirectUrl) {
                            timeoutAudio.onended = function() {
                                window.location.href = redirectUrl;
                            };
                        }
                    });
                }
            };
        }
    
        // เริ่มต้นด้วยการเล่นเสียง check.mp3 และนับถอยหลัง 30 วินาที
        checkAudio.play();
        checkAudio.onended = function() {
            startCountdown(30, function() {
                subMessage.textContent = "ถึงเวลาพูดคุย";
                talkAudio.play();
                talkAudio.onended = function() {
                    startCountdown(180, function() {
                        subMessage.textContent = "ถึงเวลาโหวต";
                        playAudioAndCountdown(voteAudio, 30, null, null, "roletalk2.html");
                    });
                };
            });
        };
    }

};
