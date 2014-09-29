function TableScan() {}

TableScan.sumColumn = function(id, columnStr) {
    var tableElement = document.getElementById(id);
    var desElement = document.getElementById("des");

    var cells = tableElement.rows[0].cells;

    var columnNum = -1;
    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        if (cell.textContent === columnStr){
            columnNum = i;
        }
    };

    var html;
    if (columnNum === -1){
        html = "Cannot find " + columnStr + " in table " + id + ".";
        desElement.innerHTML = html;
        return ;
    }

    var sum = 0;
    for (var i = 1; i < tableElement.rows.length; i++) {
        var num = tableElement.rows[i].cells[columnNum].textContent;
        num = parseFloat(num);
        if (isNaN(num))
            num = 0;
        Math.round(num * 1e2) / 1e2 // num will be rounded to the nearest hundredth
        sum += num;
    };

    var html = "Column " +  columnStr + " in table " + id + " sums to " + sum + ".";
    desElement.innerHTML = html;
}