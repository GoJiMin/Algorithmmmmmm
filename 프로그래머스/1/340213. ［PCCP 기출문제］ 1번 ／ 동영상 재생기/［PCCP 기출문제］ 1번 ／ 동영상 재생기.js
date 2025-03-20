// video_len = 비디오의 총 길이
// pos = 함수가 실행되는 시간의 시작점
// op_start = 오프닝 시작, op_end = 오프닝 종료
// commands = 입력 커맨드 배열

function solution(video_len, p, op_start, op_end, commands) {
    const [vHour, vMinutes] = video_len.split(":").map(Number);
    const [opStartHour, opStartMinutes] = op_start.split(":").map(Number);
    const [opEndHour, opEndMinutes] = op_end.split(":").map(Number);
    const [pHour, pMinutes] = p.split(":").map(Number);
    
    const totalLen = vHour * 60 + vMinutes;
    const opStart = opStartHour * 60 + opStartMinutes;
    const opEnd = opEndHour * 60 + opEndMinutes;
    
    let pos = pHour * 60 + pMinutes; // 마찬가지로 초로 환산.
    
    function isOpening() {
        if(opStart <= pos && pos <= opEnd) {
            pos = opEnd;
        }
    }
    
    function isStart() {
        if(pos < 0) {
            pos = 0;
        }
    }
    
    function isEnd() {
        if(totalLen < pos) {
            pos = totalLen;
        }
    }
    
    function checkPos() {
        isOpening();
        isStart();
        isEnd();
    }
    
    for(let i = 0; i < commands.length; i++) {
        isOpening();
        
        switch(commands[i]) {
            case "prev":
                pos -= 10;
                checkPos();
                break;
            case "next":
                pos += 10;
                checkPos();
                break;
        }
    }
    
    let resultHour = Math.floor(pos / 60);
    let resultMinutes = pos - resultHour * 60;
    
    if (resultHour < 10) {
        resultHour = `0${resultHour}`;
    }
    
    if (resultMinutes < 10) {
        resultMinutes = `0${resultMinutes}`;
    } 
    
    return `${resultHour}:${resultMinutes}`;
}