// ================= Generate Blood Pressure result =================

let generateBPResult = (sysAverage, diaAverage) => {

    if(sysAverage < 90 && diaAverage < 60){
        return 'low';
    }

    else if(sysAverage >= 90 && sysAverage < 120 && diaAverage >= 60 && diaAverage <80){
        return 'normal';
    }

    else if(sysAverage >= 120 && sysAverage < 130 && diaAverage >= 60 && diaAverage <80){
        return 'elevated';
    }

    else if((sysAverage >= 130 && sysAverage < 140) || (diaAverage >= 80 && diaAverage <90)){
        return 'high (S.1)';
    }

    else if((sysAverage >= 140 && sysAverage < 180) || diaAverage >= 90 && diaAverage <120){
        return 'high (S.2)';
    }

    else if((sysAverage >= 180) || diaAverage >= 120){
        return 'hyper crisis';
    }

}

export {generateBPResult}
