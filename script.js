let textarea = document.getElementById("textarea")
let textpreview = document.getElementById("textpreview")
const cardnumsDiv = document.getElementById("cardnums");


const captureElement = document.getElementById('cardbox');

const captureButton = document.getElementById('captureButton');





let matrix = [];

// Define the characters for each column
const columnCharacters = "..0123456789";

// Define the number of columns and rows
const numColumns = 80;
const numRows = 12;


const characters = {
    'A': [0, 3],
    'B': [0, 4],
    'C': [0, 5],
    'D': [0, 6],
    'E': [0, 7],
    'F': [0, 8],
    'G': [0, 9],
    'H': [0, 10],
    'I': [0, 11],

    'J': [1, 3],
    'K': [1, 4],
    'L': [1, 5],
    'M': [1, 6],
    'N': [1, 7],
    'O': [1, 8],
    'P': [1, 9],
    'Q': [1, 10],
    'R': [1, 11],

    'S': [2, 4],
    'T': [2, 5],
    'U': [2, 6],
    'V': [2, 7],
    'W': [2, 8],
    'X': [2, 9],
    'Y': [2, 10],
    'Z': [2, 11],

    '0': [2],
    '1': [3],
    '2': [4],
    '3': [5],
    '4': [6],
    '5': [7],
    '6': [8],
    '7': [9],
    '8': [10],
    '9': [11],
    ' ': [],
    '.': [0, 5, 10],
    "'": [7, 10],
    "!": [1, 4, 10],
    ",": [2, 5, 10],
};





textarea.addEventListener("input", function (e) {

    const audio = new Audio('./archivo.mp3');
    audio.play().catch(error => {
        console.error('Error playing audio:', error);
    });

    // update text preview
    let temptext = convertToUpperCase(e.target.value)
    // console.log(temptext)
    // textpreview.innerText = temptext

    textpreview.innerHTML = ""
    for (let i = 0; i < temptext.length; i++) {
        // Create a span element for each character
        const span = document.createElement("span");
        span.textContent = temptext[i]

        // Append the span to the row div
        textpreview.appendChild(span);


    }




    // reset matrix
    matrix = [];
    for (let i = 0; i < numColumns; i++) {
        const column = [];
        for (let j = 0; j < numRows; j++) {
            column.push(columnCharacters[j]);
        }
        matrix.push(column);
    }
    // update matrix
    console.log(temptext.length)
    console.log(temptext)
    for (let index = 0; index < temptext.length; index++) {
        // get current charcter
        let currentchar = temptext[index]
        // console.log(currentchar)
        let puncharray = characters[currentchar]
        // console.log(puncharray)
        for (let i = 0; i < puncharray.length; i++) {
            matrix[index][puncharray[i]] = "█"

        }


    }

    // render the new matrix
    rendermatrix()

})


// create and populate the matrix
// Create the matrix
for (let i = 0; i < numColumns; i++) {
    const column = [];
    for (let j = 0; j < numRows; j++) {
        column.push(columnCharacters[j]);
    }
    matrix.push(column);
}

// Print the matrix (for demonstration)
console.log(matrix);

// render matrix
rendermatrix()




function rendermatrix() {
    cardnumsDiv.innerHTML = ""

    // Assuming you have already created the matrix as described in the previous response

    // Iterate through each row of the matrix

    for (let index = 0; index < matrix[0].length; index++) {
        // Create a div for each row
        const rowDiv = document.createElement("div");
        let rowIndex

        // // Iterate through each character in the row
        // row.forEach((char) => {
        //     // Create a span element for each character
        //     const span = document.createElement("span");
        //     span.textContent = char;

        //     // Append the span to the row div
        //     rowDiv.appendChild(span);
        // });


        for (let i = 0; i < matrix.length; i++) {
            // Create a span element for each character
            const span = document.createElement("span");
            span.textContent = matrix[i][index];

            if (matrix[i][index] == "█") {
                span.style.color = "white";
            }
            // Append the span to the row div
            rowDiv.appendChild(span);
            rowIndex = i
        }

        // Append the row div to the "cardnums" div
        cardnumsDiv.appendChild(rowDiv);

        // Add a line break after each row except the last one
        if (rowIndex < matrix.length - 1) {
            cardnumsDiv.appendChild(document.createElement("br"));
        }

    }





}


// Add a click event listener to the button
captureButton.addEventListener('click', () => {

    // Use HTML2Canvas to capture the element
    html2canvas(captureElement).then(canvas => {
        // Convert the canvas to a data URL (base64 encoded image)
        const screenshotDataUrl = canvas.toDataURL('image/png');

        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = screenshotDataUrl;
        downloadLink.download = 'screenshot.png'; // Set the filename

        // Trigger a click event on the download link
        downloadLink.click();
    });
});


function convertToUpperCase(inputString) {
    return inputString.toUpperCase();
}