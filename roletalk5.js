window.onload = function() {
    var checkAudio = document.getElementById('roletalkAudio');
    var timeoutAudio = document.getElementById('timeoutAudio');
    var countdownElement = document.getElementById('countdown');
    var timeLeft = 30;
    var countdownInterval;

    document.getElementById("endGameBtn").addEventListener("click", function() {
        window.location.href = "endgame.html";
    });

    roletalkAudio.play()
    checkAudio.onended = function(){
        countdownInterval = setInterval(updateTimer, 1000);
    };
    function updateTimer() {
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        countdownElement.textContent = minutes + " : " + seconds;

        // เมื่อเหลือ 5 วินาทีให้เปลี่ยนสีข้อความเป็นสีแดงและเล่นเสียง timeout.mp3
        if (timeLeft === 5) {
            countdownElement.classList.add('red');
            timeoutAudio.play();
        }

        // เมื่อเวลาถึง 0 วินาทีให้หยุดการนับถอยหลังและเปลี่ยนหน้า
        if (timeLeft === 0) {
            clearInterval(countdownInterval); // หยุดการนับถอยหลัง
            timeoutAudio.onended = function() {
                window.location.href = "endgame.html";
            };
        }

        timeLeft--; // ลดเวลาลง 1 วินาที
    }
};
