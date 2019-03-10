                                            
function getData(url, cb) {                        
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);     
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));              
        }                                                  
    };
}


// HERE WE START TO DISPLAT OUR DATA IN A TABLE...

function getTableHeaders(obj) {
    var tableHeaders = [];
    
    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);   
    });                                         

    return `<tr>${tableHeaders}</tr>`;
    
}

function generatePaginationButtons(next, prev) {    //the pagination funtcion to display one or both buttons
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

function writeToDocument(url) {    
    var tableRows = [];
    var el = document.getElementById("data");   
                                                
    getData(url, function(data) {
        
        var pagination;                         //creating pagiination buttons if they are needeed
        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous);
        }
        
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            var dataRow = [];
            
            Object.keys(item).forEach(function(key) {
             
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15); // this var will cust lines off at 15 character to clean up the screen
             
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`); 
        });
        
         el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");
    });                                                         // the replace action here will find all commas and         
                                                                // replace them with blanks.    
}
