document.getElementById('equationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const a1 = parseFloat(document.getElementById('a1').value);
    const b1 = parseFloat(document.getElementById('b1').value);
    const c1 = parseFloat(document.getElementById('c1').value);
    const a2 = parseFloat(document.getElementById('a2').value);
    const b2 = parseFloat(document.getElementById('b2').value);
    const c2 = parseFloat(document.getElementById('c2').value);

    const op1 = document.getElementById('op1').value;
    const op2 = document.getElementById('op2').value;

    // Mengubah tanda berdasarkan operasi
    const b1Final = op1 === 'add' ? b1 : -b1;
    const b2Final = op2 === 'add' ? b2 : -b2;

    const D = a1 * b2Final - a2 * b1Final;
    const Dx = c1 * b2Final - c2 * b1Final;
    const Dy = a1 * c2 - a2 * c1;

    let stepsText = "<strong>Langkah-langkah:</strong><br>";
    stepsText += `1. Hitung D = a1 * b2 - a2 * b1 = ${a1} * ${b2Final} - ${a2} * ${b1Final} = ${D}<br>`;
    stepsText += `2. Hitung Dx = c1 * b2 - c2 * b1 = ${c1} * ${b2Final} - ${c2} * ${b1Final} = ${Dx}<br>`;
    stepsText += `3. Hitung Dy = a1 * c2 - a2 * c1 = ${a1} * ${c2} - ${a2} * ${c1} = ${Dy}<br>`;

    let resultText;

    if (D === 0) {
        if (Dx === 0 && Dy === 0) {
            resultText = "SPLDV memiliki solusi tak terhingga.";
            stepsText += "4. D = 0, Dx = 0, Dy = 0: Solusi tak terhingga.";
        } else {
            resultText = "SPLDV tidak memiliki solusi.";
            stepsText += "4. D = 0 dan Dx/Dy tidak sama dengan 0: Tidak ada solusi.";
        }
    } else {
        const x = Dx / D;
        const y = Dy / D;
        resultText = `Solusi: x = ${x.toFixed(2)}, y = ${y.toFixed(2)}`;
        stepsText += `4. Hitung x = Dx / D = ${Dx} / ${D} = ${x.toFixed(2)}<br>`;
        stepsText += `5. Hitung y = Dy / D = ${Dy} / ${D} = ${y.toFixed(2)}<br>`;
    }

    document.getElementById('steps').innerHTML = stepsText;
    document.getElementById('result').innerText = resultText;
});