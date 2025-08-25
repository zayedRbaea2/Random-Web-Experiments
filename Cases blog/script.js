function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent =
        now.toLocaleTimeString({ hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

function addEmployee(inputId, statusId, listId) {
    const nameInput = document.getElementById(inputId);
    const statusInput = document.getElementById(statusId);
    const employeeList = document.getElementById(listId);

    const name = nameInput.value.trim();
    // if (!name) return alert('يرجى إدخال اسم');

    const listItem = document.createElement('li');
    listItem.className = statusInput.value;

    const itemContent = document.createElement('div');
    itemContent.className = 'list-item';

    const nameSpan = document.createElement('span');
    nameSpan.textContent = name;
    itemContent.appendChild(nameSpan);

    const buttonsGroup = document.createElement('div');
    buttonsGroup.className = 'buttons-group';

    const toggleButton = document.createElement('button');
    toggleButton.textContent = statusInput.value === 'migrated' ? 'تم' : 'لم يتم';
    toggleButton.onclick = () => {
        listItem.classList.toggle('migrated');
        listItem.classList.toggle('not-migrated');
        toggleButton.textContent = listItem.classList.contains('migrated') ? 'تم' : 'لم يتم';
    };
    buttonsGroup.appendChild(toggleButton);

    const copyButton = document.createElement('button');
    copyButton.textContent = 'نسخ';
    copyButton.onclick = () => {
        navigator.clipboard.writeText(name);
    };
    buttonsGroup.appendChild(copyButton);

    itemContent.appendChild(buttonsGroup);
    listItem.appendChild(itemContent);
    employeeList.appendChild(listItem);

    nameInput.value = '';
}

function saveDataToFile(listId, filenamePrefix) {
    const employeeList = document.querySelectorAll(`#${listId} li`);
    let data = "ID, Name, Status\n";

    employeeList.forEach((item, index) => {
        const name = item.querySelector('span').textContent;
        const status = item.classList.contains('migrated') ? 'تم' : 'لم يتم';
        data += `${index + 1}, ${name}, ${status}\n`;
    });

    const now = new Date();
    const filename = `${filenamePrefix}_${now.toISOString().split('T')[0]}.txt`;
    const blob = new Blob([data], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}
