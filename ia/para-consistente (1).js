function paraconsistente(favoravel , contraria){//evidencia favoravel(% de obesidade), evidencia contraria(nivel de atividade)
    const ef = favoravel / 10;
    const ec = contraria / 10;
    
    console.log("ef: "+ef);
    console.log("ef: "+ec);
    const ctmenos = ef-ec;//grau de certeza 
    const ctmais = ec+ef-1;//grau de inceteza
    let saida = ''; 
    let response = 0;

    if(ef!==ec){ 
       if(ctmenos >= 0.5 &&ef>=0.5 &&ec<=0.5){
        saida ="Verdadeiro"; 
        response = 0.85;
        console.log("saida: " + saida);
        return response;
       }if(ctmenos <= -0.5 &&ef<=0.5 &&ec>=0.5){
        saida ="Falso"; 
        response = 1;
        console.log("saida: " + saida);
        return response;
       }if(ctmais >= 0.5 &&ef>=0.5 &&ec>=0.5){
        saida ="Inconsistente"; 
        response = 0.95;
       }if(ctmais <= -0.5 &&ef<=0.5 &&ec<=0.5){
        saida ="Paracompleto"; 
        response = 1;
        console.log("saida: " + saida);
        return response;
       }if(ctmenos<=0.5 && ctmais >=0 &&ef>=0 && ef>ec){
        saida ="Quase verdadeiro tendendo ao inconsistente(QV->I)"; 
        response = 0.90;
        console.log("saida: " + saida);
        return response;
       }if(ctmenos <=0.5 && ctmais<=0 &&ef>=0.5 && ef>ec){
        saida ="Quase verdadeiro tendendo ao paracompleto (QV->P)"; 
        response = 0.90;
        console.log("saida: " + saida);
        return response;
       }if(ctmenos>=-0.5 && ctmais >= 0 &&ef<=0.5 && ec>ef){
        saida ="Quase falso tendendo ao inconsistente(QF->I)"; 
        response = 0.95;
        console.log("saida: " + saida);
        return response;
       }if(ctmenos <= -0.5 &&ctmais <= 0 &&ef<=0.5 && ec>ef){
        saida ="Quase falso tendendo ao paracompleto(QF->P)"; 
        response = 0.95;
        console.log("saida: " + saida);
        return response;
       }if(ctmais<=0.5 && ctmenos >= 0 &&ec>=0.5 && ef>ec){
        saida ="Quase inconsistente tendendo ao verdadeiro(QI->V)";
        response = 0.90; 
        console.log("saida: " + saida);
        return response;
       } if(ctmais<=0.5 && ctmenos <= 0 &&ef>=0.5 && ec>ef){
        saida ="Qase inconsistente tendendo a falso(QI->F)"; 
        response = 0.95;
        console.log("saida: " + saida);
        return response;
       }if(ctmais>=-0.5 && ctmenos>=0 &&ef<=0.5 && ef>ec){
        saida ="Quase paracompleto tendendo a verdadeiro(QP->V)"; 
        response = 0.90;
        console.log("saida: " + saida);
        return response;
       }if(ctmais>=-0.5 && ctmenos <= 0 &&ef<=0.5 && ec>ef){
        saida ="Quase Paracompleto tendendo a falso(QP->F)"; 
        response = 0.95;
        console.log("saida: " + saida);
        return response;
       }if(saida== null){
        saida = "Erro sem definicao";
       }
     }else{
      if(ef===1){
        saida = "inconsiste"; 
        response = 1;
       }else{
         if(ef === 0){
           saida="paracompleto"; 
           response = 0.95;
         }else{
           saida="contradicao"; 
           response = 1;
         }
       }
      }
      console.log("saida: " + saida);
      return response;
}


const response = paraconsistente(7.0 , 6.4);

console.log("response: " + response);

