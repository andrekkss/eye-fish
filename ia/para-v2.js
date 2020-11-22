//contraria > minimo favoravel 
//contraria < maximo favoravel 
//contraria == atual

//objetivo entrar em um range
//ef == evidencia favoravel == minimo ou maximo
//ec == evidencia contraria == ph atual
//ctmenos == grau de certeza == grauDeCertezaMinimo
//ctmais == grau de inceteza == grauDeIncertezaMinimo
function valida(ef, ec, ctmenos, ctmais) {
    if (ef !== ec) {
        if (ctmenos >= 0.5 && ef >= 0.5 && ec <= 0.5) {
            return true;
        } if (ctmenos <= -0.5 && ef <= 0.5 && ec >= 0.5) {
            return false;
        } if (ctmais >= 0.5 && ef >= 0.5 && ec >= 0.5 && ec > ef) {
            return true;
        } if (ctmenos <= 0.5 && ctmais >= 0 && ef >= 0 && ef > ec) {
            return false;
        } if (ctmenos <= 0.5 && ctmais <= 0 && ef >= 0.5 && ef > ec) {
            return true;
        } if (ctmais <= 0.5 && ctmenos >= 0 && ec >= 0.5 && ef > ec) {
            return false;
        } if (ctmais <= 0.5 && ctmenos <= 0 && ef >= 0.5 && ec > ef) {
            return true;
        } else return false;
    } else {
        if (ef === 1) {
            return true;
        } else {
            if (ef === 0) {
                return false;
            } else {
                return false;
            }
        }
    }
}

function paraconsistente(minimo, maximo, atual) {
    //contraria > minimo favoravel 
    //contraria < maximo favoravel 
    //contraria == atual
    const dMinimo = minimo / 10;
    const dMaximo = maximo / 10;
    const dAtual = atual / 10;

    const grauDeIncertezaMinimo = dAtual + dMinimo - 1;
    const grauDeCertezaMinimo = dMinimo - dAtual;

    const grauDeIncertezaMaximo = dAtual + dMaximo - 1;
    const grauDeCertezaMaximo = dMaximo - dAtual;

    const validadoMinimo = valida(dMinimo, dAtual, grauDeCertezaMinimo, grauDeIncertezaMinimo);
    const validadoMaximo = valida(dMaximo, dAtual, grauDeCertezaMaximo, grauDeIncertezaMaximo);

    if (validadoMinimo && validadoMaximo) {
        console.log("pinga");
        console.log("\n");
    } else {
        console.log("nao pinga");
        console.log("\n");
    }
}

const minimo_test_1 = 7.0
const maximo_test_1 = 7.8
const atual_test_1 = 7.2

const minimo_test_2 = 7.8
const maximo_test_2 = 8.6
const atual_test_2 = 8.1

paraconsistente(minimo_test_1, maximo_test_1, atual_test_1);
paraconsistente(minimo_test_2, maximo_test_2, atual_test_2);



