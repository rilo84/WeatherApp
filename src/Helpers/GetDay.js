const getForecastDay= (day) =>{
    
    if(day > 6){
        day = day-7;
    }
    
    switch (day) {
        case 0: return "Mån";
        case 1: return "Tis";
        case 2: return "Ons";   
        case 3:return "Tor";
        case 4: return "Fre";
        case 5: return "Lör";
        case 6: return "Sön";
        default:
            break;
    }
};

export default getForecastDay;