let records = [];
let styleNumbers = []; // 款号列表
let processes = []; // 工序列表

// 初始化款号和工序
function init() {
    styleNumbers = ["A001", "A002"];
    processes = ["接螺纹", "订位", "包围条", "压线", "接领", "做帽子", "压帽子领线", "压脚边线"];
    updateStyleNumberOptions();
    updateProcessOptions();
}

// 更新款号选项
function updateStyleNumberOptions() {
    const styleNumberSelect = document.getElementById('styleNumber');
    styleNumberSelect.innerHTML = styleNumbers.map(style => `<option value="${style}">${style}</option>`).join('');
}

// 更新工序选项
function updateProcessOptions() {
    const processSelect = document.getElementById('process');
    processSelect.innerHTML = processes.map(process => `<option value="${process}">${process}</option>`).join('');
}

// 添加款号
function addStyleNumber() {
    const styleNumber = document.getElementById('configStyleNumber').value;
    if (styleNumber && !styleNumbers.includes(styleNumber)) {
        styleNumbers.push(styleNumber);
        updateStyleNumberOptions();
    }
}

// 添加工序
function addProcess() {
    const process = document.getElementById('configProcess').value;
    if (process && !processes.includes(process)) {
        processes.push(process);
        updateProcessOptions();
    }
}

// 添加记录
function addRecord() {
    const date = document.getElementById('date').value;
    const employee = document.getElementById('employee').value;
    const styleNumber = document.getElementById('styleNumber').value;
    const process = document.getElementById('process').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    if (!date || !employee || !styleNumber || !process || isNaN(price) || isNaN(quantity)) {
        alert("请填写所有字段，并确保单价和件数为有效数字！");
        return;
    }

    const total = price * quantity;

    const record = {
        date,
        employee,
        styleNumber,
        process,
        price,
        quantity,
        total
    };

    records.push(record);
    updateTable();
    updateSummary();
}

// 更新表格
function updateTable() {
    const tableBody = document.querySelector('#recordTable tbody');
    tableBody.innerHTML = records.map((record, index) => `
        <tr>
            <td>${record.date}</td>
            <td>${record.employee}</td>
            <td>${record.styleNumber}</td>
            <td>${record.process}</td>
            <td>${record.price.toFixed(2)}</td>
            <td>${record.quantity}</td>
            <td>${record.total.toFixed(2)}</td>
            <td>
                <button onclick="editRecord(${index})">编辑</button>
                <button onclick="deleteRecord(${index})">删除</button>
            </td>
        </tr>
    `).join('');
}

// 更新员工汇总
function updateSummary() {
    const summary = {};
    records.forEach(record => {
        if (!summary[record.employee]) {
            summary[record.employee] = 0;
        }
        summary[record.employee] += record.total;
    });

    const summaryBody = document.querySelector('#summaryTable tbody');
    summaryBody.innerHTML = Object.keys(summary).map(employee => `
        <tr>
            <td>${employee}</td>
            <td>${summary[employee].toFixed(2)}</td>
        </tr>
    `).join('');
}

// 编辑记录
function editRecord(index) {
    const record = records[index];
    document.getElementById('date').value = record.date;
    document.getElementById('employee').value = record.employee;
    document.getElementById('styleNumber').value = record.styleNumber;
    document.getElementById('process').value = record.process;
    document.getElementById('price').value = record.price;
    document.getElementById('quantity').value = record.quantity;

    records.splice(index, 1);
    updateTable();
    updateSummary();
}

// 删除记录
function deleteRecord(index) {
    records.splice(index, 1);
    updateTable();
    updateSummary();
}

// 初始化
init();
