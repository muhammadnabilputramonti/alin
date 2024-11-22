document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    let matrixA = [
        [
            parseFloat(document.getElementById("a1").value),
            parseFloat(document.getElementById("b1").value),
            parseFloat(document.getElementById("c1").value)
        ],
        [
            parseFloat(document.getElementById("a2").value),
            parseFloat(document.getElementById("b2").value),
            parseFloat(document.getElementById("c2").value)
        ],
        [
            parseFloat(document.getElementById("a3").value),
            parseFloat(document.getElementById("b3").value),
            parseFloat(document.getElementById("c3").value)
        ]
    ];

    let results = [
        parseFloat(document.getElementById("result1").value),
        parseFloat(document.getElementById("result2").value),
        parseFloat(document.getElementById("result3").value)
    ];

    try {
        let solution = math.lusolve(matrixA, results);
        
        let stepsHtml = `
            <h3>Langkah-Langkah Penyelesaian:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Persamaan</th>
                        <th>Langkah-langkah</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Persamaan 1: ${matrixA[0][0]}x + ${matrixA[0][1]}y + ${matrixA[0][2]}z = ${results[0]}</td>
                        <td>
                            1. Persamaan pertama: <strong>${matrixA[0][0]}x + ${matrixA[0][1]}y + ${matrixA[0][2]}z = ${results[0]}</strong><br>
                            2. Jika kita ingin menyelesaikan untuk z, kita perlu memanipulasi persamaan:<br>
                            &nbsp;&nbsp;&nbsp;${matrixA[0][2]}z = ${results[0]} - (${matrixA[0][0]}x + ${matrixA[0][1]}y)<br>
                            &nbsp;&nbsp;&nbsp;z = ( ${results[0]} - ${matrixA[0][0]}x - ${matrixA[0][1]}y ) / ${matrixA[0][2]}<br>
                            3. Berarti z dapat dinyatakan dalam fungsi dari x dan y.<br>
                        </td>
                    </tr>
                    <tr>
                        <td>Persamaan 2: ${matrixA[1][0]}x + ${matrixA[1][1]}y + ${matrixA[1][2]}z = ${results[1]}</td>
                        <td>
                            1. Persamaan kedua: <strong>${matrixA[1][0]}x + ${matrixA[1][1]}y + ${matrixA[1][2]}z = ${results[1]}</strong><br>
                            2. Kita menggunakan nilai z yang telah kita peroleh dari langkah sebelumnya:<br>
                            &nbsp;&nbsp;&nbsp;${matrixA[1][0]}x + ${matrixA[1][1]}y + ${matrixA[1][2]} * (( ${results[0]} - ${matrixA[0][0]}x - ${matrixA[0][1]}y ) / ${matrixA[0][2]}) = ${results[1]}<br>
                            3. Sederhanakan persamaan ini untuk y:<br>
                            &nbsp;&nbsp;&nbsp;${matrixA[1][0]}x + ${matrixA[1][1]}y + (${matrixA[1][2]} * ${results[0]} / ${matrixA[0][2]} ) - (${matrixA[1][2]} * ${matrixA[0][0]} / ${matrixA[0][2]} ) x - (${matrixA[1][2]} * ${matrixA[0][1]} / ${matrixA[0][2]} ) y = ${results[1]}<br>
                            &nbsp;&nbsp;&nbsp;Selesaikan untuk y setelah menyusun ulang.<br>
                        </td>
                    </tr>
                    <tr>
                        <td>Persamaan 3: ${matrixA[2][0]}x + ${matrixA[2][1]}y + ${matrixA[2][2]}z = ${results[2]}</td>
                        <td>
                            1. Persamaan ketiga: <strong>${matrixA[2][0]}x + ${matrixA[2][1]}y + ${matrixA[2][2]}z = ${results[2]}</strong><br>
                            2. Sekarang, kita substitusi nilai z dari persamaan pertama yang sudah ditentukan: <br>
                            &nbsp;&nbsp;&nbsp;${matrixA[2][0]}x + ${matrixA[2][1]}y + ${matrixA[2][2]} * (( ${results[0]} - ${matrixA[0][0]}x - ${matrixA[0][1]}y ) / ${matrixA[0][2]}) = ${results[2]}<br>
                            3. Sederhanakan persamaan ini:<br>
                            &nbsp;&nbsp;&nbsp;${matrixA[2][0]}x + ${matrixA[2][1]}y + (${matrixA[2][2]} * ${results[0]} / ${matrixA[0][2]}) - (${matrixA[2][2]} * ${matrixA[0][0]} / ${matrixA[0][2]})x - (${matrixA[2][2]} * ${matrixA[0][1]} / ${matrixA[0][2]})y = ${results[2]}<br>
                            4. Susun ulang persamaan untuk mendapatkan bentuk yang lebih sederhana:<br>
                            &nbsp;&nbsp;&nbsp;(${matrixA[2][0]} - (${matrixA[2][2]} * ${matrixA[0][0]} / ${matrixA[0][2]}))x + (${matrixA[2][1]} - (${matrixA[2][2]} * ${matrixA[0][1]} / ${matrixA[0][2]}))y = ${results[2]} - (${matrixA[2][2]} * ${results[0]} / ${matrixA[0][2]})<br>
                            5. Dengan langkah ini, kita mendapatkan sistem dua persamaan dengan dua variabel (x dan y) yang dapat diselesaikan.<br>
                        </td>
                    </tr>
                </tbody>
            </table>
        `;

        document.getElementById("steps").innerHTML = stepsHtml;
        
        document.getElementById("result").innerHTML = `
            <h3>Hasil Penyelesaian:</h3>
            <p><strong>x = ${solution[0][0].toFixed(2)}</strong> (nilai x yang ditemukan dari sistem persamaan)</p>
            <p><strong>y = ${solution[1][0].toFixed(2)}</strong> (nilai y yang ditemukan dari sistem persamaan)</p>
            <p><strong>z = ${solution[2][0].toFixed(2)}</strong> (nilai z yang ditemukan dari sistem persamaan)</p>
        `;

        // Tambahkan verifikasi solusi
        let verificationHtml = `
            <h3>Verifikasi Hasil:</h3>
            <p>Penting untuk memverifikasi hasil dengan memasukkan nilai x, y, dan z ke dalam masing-masing persamaan awal:</p>
            <ol>
                <li>Untuk Persamaan 1: 
                    <strong>${matrixA[0][0]}(${solution[0][0].toFixed(2)}) + ${matrixA[0][1]}(${solution[1][0].toFixed(2)}) + ${matrixA[0][2]}(${solution[2][0].toFixed(2)}) = ${results[0]}</strong>
                </li>
                <li>Untuk Persamaan 2: 
                    <strong>${matrixA[1][0]}(${solution[0][0].toFixed(2)}) + ${matrixA[1][1]}(${solution[1][0].toFixed(2)}) + ${matrixA[1][2]}(${solution[2][0].toFixed(2)}) = ${results[1]}</strong>
                </li>
                <li>Untuk Persamaan 3: 
                    <strong>${matrixA[2][0]}(${solution[0][0].toFixed(2)}) + ${matrixA[2][1]}(${solution[1][0].toFixed(2)}) + ${matrixA[2][2]}(${solution[2][0].toFixed(2)}) = ${results[2]}</strong>
                    </li>
                </ol>
                <p>Dengan memasukkan nilai-nilai tersebut, kita memastikan bahwa solusi yang diperoleh memenuhi semua persamaan.</p>
            `;
    
            document.getElementById("result").innerHTML += verificationHtml;
    
        } catch (error) {
            document.getElementById("steps").innerHTML = `<p>Terjadi kesalahan dalam perhitungan, periksa input anda.</p>`;
            document.getElementById("result").innerHTML = '';
        }
    });