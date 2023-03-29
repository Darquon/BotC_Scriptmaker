$(document).ready( function() {
    var line2 = "Test Character";
    var httpRequest = new XMLHttpRequest();
    var scriptNameInput = document.getElementById('scriptNameInput');
    var townsfolkList = document.getElementById('townsfolkList');
    var outsiderList = document.getElementById('outsiderList');
    var minionList = document.getElementById('minionList');
    var demonList = document.getElementById('demonList');
    var travelerList = document.getElementById('travelerList');
    var imageWidth = "50px";
    var response;
    var scriptName = "";
    $('#character1').html(line2);
    httpRequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            console.log('Ready');
            response = JSON.parse(httpRequest.responseText);
            //**********Townsfolk**********
            var j=0;
            for (var i=0; i<response.length; i++){
                if(response[i].team === "townsfolk"){
                    var option = document.createElement('option');
                    option.text = response[i].name;
                    townsfolkList.add(option,j);
                    j++;
                };
            };
            //**********Outsiders**********
            j=0;
            for (var i=0; i<response.length; i++){
                if(response[i].team === "outsider"){
                    var option = document.createElement('option');
                    option.text = response[i].name;
                    outsiderList.add(option,j);
                    j++;
                };
            };
            //**********Minions**********
            j=0;
            for (var i=0; i<response.length; i++){
                if(response[i].team === "minion"){
                    var option = document.createElement('option');
                    option.text = response[i].name;
                    minionList.add(option,j);
                    j++;
                };
            };
            //**********Demons**********
            j=0;
            for (var i=0; i<response.length; i++){
                if(response[i].team === "demon"){
                    var option = document.createElement('option');
                    option.text = response[i].name;
                    demonList.add(option,j);
                    j++;
                };
            };
            //**********Travelers**********
            j=0;
            for (var i=0; i<response.length; i++){
                if(response[i].team === "traveler"){
                    var option = document.createElement('option');
                    option.text = response[i].name;
                    travelerList.add(option,j);
                    j++;
                };
            };
        } else {
            console.log('Not Ready Yet');
        };
    };
    document.getElementById('scriptNameInput').onchange = updateSheet;
    document.getElementById('townsfolkList').onchange = updateSheet;
    document.getElementById('outsiderList').onchange = updateSheet;
    document.getElementById('minionList').onchange = updateSheet;
    document.getElementById('demonList').onchange = updateSheet;
    document.getElementById('travelerList').onchange = updateSheet;
            
    function updateSheet(){
        var characters = [];
        //**********ScriptName**********
        scriptName = scriptNameInput.value;
        var scriptNameOutput = scriptName;
        for(var i=131-scriptNameOutput.length; i>0; i--){
            scriptNameOutput = scriptNameOutput + "-";
        };
        //*******Player Sheet: Townsfolk**************
        //*****First Night Info 1-100*****************
        //*****Every Night Info 101-200***************
        //*****Other Night Info 201-300***************
        //*****Every Day Info 301-400*****************
        //*****Death Related Info 401-500*************
        //*****Once Per Game 501-600******************
        //*****Protection 601-700*********************
        //********************************************
        var selectedTF = [...townsfolkList.options]
                .filter(option => option.selected)
                .map(option => option.value);
        const townsfolkTable = document.querySelector("#playerSheetTownData");
        townsfolkTable.innerHTML = "";
        var headerRow = townsfolkTable.insertRow(0);
        var headerCell = headerRow.insertCell(0);
        headerCell.colSpan = "6";
        headerCell.innerHTML = "-----" + scriptNameOutput + "Townsfolk---";
        var townsfolkArr = [];
        for(var i=1; i<700; i++){
            for(var j=0; j<selectedTF.length; j++){
                for(var k=0; k<response.length; k++){
                    if((response[k].sheetOrder === i) && (response[k].name === selectedTF[j])){
                        var character = {
                            name: response[k].name,
                            imageAddress: response[k].imageAddress,
                            ability: response[k].ability
                        };
                        townsfolkArr.push(character);
                        characters.push(response[k].name);
                    };
                };
            };
        };
        for(var i=0; i<townsfolkArr.length; i++){           
            var newRow = $("<tr>");
            var outCell1 = "";
            var outCell2 = "";
            var outCell4 = "";
            var outCell5 = "";
            var div1 = document.createElement("div");
            div1.className = "image-container";
            var img1 = new Image();
            var div2 = document.createElement("div");
            div2.className = "image-container";
            var img2 = new Image();
            img1.src = townsfolkArr[i].imageAddress;
            outCell1 = townsfolkArr[i].name;
            outCell2 = townsfolkArr[i].ability;
            if(townsfolkArr.length > i+1){
                img2.src = townsfolkArr[i+1].imageAddress;
                outCell4 = townsfolkArr[i+1].name;
                outCell5 = townsfolkArr[i+1].ability;
            };
            img1.style.width = imageWidth;
            img2.style.width = imageWidth;
            div1.appendChild(img1);
            newRow.append($("<td>").append(div1)).attr("class", "referenceTableName");
            newRow.append($("<td>").text(outCell1)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell2)).attr("class","referenceTableAbility");
            div2.appendChild(img2);
            newRow.append($("<td>").append(div2)).attr("class", "referenceTableName");
            newRow.append($("<td>").text(outCell4)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell5)).attr("class","referenceTableAbility");
            $(townsfolkTable).append(newRow);
            i++;
        };
        //*******Player Sheet: Outsiders**************
        //*****Limited Action 1-100*******************
        //*****False Info 101-200*********************
        //*****Death Related Info 201-300*************
        //*****Once Per Game 301-400******************
        //********************************************
        var selectedOut = [...outsiderList.options]
                .filter(option => option.selected)
                .map(option => option.value);
        const outsiderTable = document.querySelector("#playerSheetOutData");
        outsiderTable.innerHTML = "";
        var headerRow = outsiderTable.insertRow(0);
        var headerCell = headerRow.insertCell(0);
        headerCell.colSpan = "6";
        headerCell.innerHTML = "----------------------------------------------------------------------------------------------------------------------------------------Outsiders---";
        var outsiderArr = [];
        for(var i=1; i<400; i++){
            for(var j=0; j<selectedOut.length; j++){
                for(var k=0; k<response.length; k++){
                    if((response[k].sheetOrder === i) && (response[k].name === selectedOut[j])){
                        var character = {
                            name: response[k].name,
                            imageAddress: response[k].imageAddress,
                            ability: response[k].ability
                        };
                        outsiderArr.push(character);
                        characters.push(response[k].name);
                    };
                };
            };
        };
        for(var i=0; i<outsiderArr.length; i++){           
            var newRow = $("<tr>");
            var outCell1 = "";
            var outCell2 = "";
            var outCell4 = "";
            var outCell5 = "";
            var div1 = document.createElement("div");
            div1.className = "image-container";
            var img1 = new Image();
            var div2 = document.createElement("div");
            div2.className = "image-container";
            var img2 = new Image();
            img1.src = outsiderArr[i].imageAddress;
            outCell1 = outsiderArr[i].name;
            outCell2 = outsiderArr[i].ability;
            if(outsiderArr.length > i+1){
                img2.src = outsiderArr[i+1].imageAddress;
                outCell4 = outsiderArr[i+1].name;
                outCell5 = outsiderArr[i+1].ability;
            };
            img1.style.width = imageWidth;
            img2.style.width = imageWidth;
            div1.appendChild(img1);
            newRow.append($("<td>").append(div1)).attr("class", "referenceTableName");
            newRow.append($("<td>").text(outCell1)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell2)).attr("class","referenceTableAbility");
            div2.appendChild(img2);
            newRow.append($("<td>").append(div2)).attr("class", "referenceTableName");
            newRow.append($("<td>").text(outCell4)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell5)).attr("class","referenceTableAbility");
            $(outsiderTable).append(newRow);
            i++;
        };
        //********Player Sheet: Minions***************
        //*****False Info 1-100***********************
        //*****Protection pt1 101-200*****************
        //*****Death Related 201-300******************
        //*****Evil Info pt2 301-400******************
        //********************************************
        var selectedMin = [...minionList.options]
                .filter(option => option.selected)
                .map(option => option.value);
        const minionTable = document.querySelector("#playerSheetMinData");
        minionTable.innerHTML = "";
        var headerRow = minionTable.insertRow(0);
        var headerCell = headerRow.insertCell(0);
        headerCell.colSpan = "6";
        headerCell.innerHTML = "----------------------------------------------------------------------------------------------------------------------------------------Minions-----";
        var minionArr = [];
        for(var i=1; i<400; i++){
            for(var j=0; j<selectedMin.length; j++){
                for(var k=0; k<response.length; k++){
                    if((response[k].sheetOrder === i) && (response[k].name === selectedMin[j])){
                        var character = {
                            name: response[k].name,
                            imageAddress: response[k].imageAddress,
                            ability: response[k].ability
                        };
                        minionArr.push(character);
                        characters.push(response[k].name);
                    };
                };
            };
        };
        for(var i=0; i<minionArr.length; i++){           
            var newRow = $("<tr>");
            var outCell1 = "";
            var outCell2 = "";
            var outCell4 = "";
            var outCell5 = "";
            var div1 = document.createElement("div");
            div1.className = "image-container";
            var img1 = new Image();
            var div2 = document.createElement("div");
            div2.className = "image-container";
            var img2 = new Image();
            img1.src = minionArr[i].imageAddress;
            outCell1 = minionArr[i].name;
            outCell2 = minionArr[i].ability;
            if(minionArr.length > i+1){
                img2.src = minionArr[i+1].imageAddress;
                outCell4 = minionArr[i+1].name;
                outCell5 = minionArr[i+1].ability;
            };
            img1.style.width = imageWidth;
            img2.style.width = imageWidth;
            div1.appendChild(img1);
            newRow.append($("<td>").append(div1)).attr("class", "referenceTableName");
            newRow.append($("<td>").text(outCell1)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell2)).attr("class","referenceTableAbility");
            div2.appendChild(img2);
            newRow.append($("<td>").append(div2)).attr("class", "referenceTableName");
            newRow.append($("<td>").text(outCell4)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell5)).attr("class","referenceTableAbility");
            $(minionTable).append(newRow);
            i++;
        };
        //********Player Sheet: Demons****************
        //*****Kills Other Night 1-100****************
        //*****ST Chosen Deaths 101-200***************
        //*****Other Deaths 201-300*******************
        //*****No Deaths 301-400**********************
        //********************************************
        var selectedDem = [...demonList.options]
                .filter(option => option.selected)
                .map(option => option.value);
        const demonTable = document.querySelector("#playerSheetDemData");
        demonTable.innerHTML = "";
        var headerRow = demonTable.insertRow(0);
        var headerCell = headerRow.insertCell(0);
        headerCell.colSpan = "6";
        headerCell.innerHTML = "----------------------------------------------------------------------------------------------------------------------------------------Demons------";
        var demonArr = [];
        for(var i=1; i<400; i++){
            for(var j=0; j<selectedDem.length; j++){
                for(var k=0; k<response.length; k++){
                    if((response[k].sheetOrder === i) && (response[k].name === selectedDem[j])){
                        var character = {
                            name: response[k].name,
                            imageAddress: response[k].imageAddress,
                            ability: response[k].ability
                        };
                        demonArr.push(character);
                        characters.push(response[k].name);
                    };
                };
            };
        };
        for(var i=0; i<demonArr.length; i++){           
            var newRow = $("<tr>");
            var outCell1 = "";
            var outCell2 = "";
            var outCell4 = "";
            var outCell5 = "";
            var div1 = document.createElement("div");
            div1.className = "image-container";
            var img1 = new Image();
            var div2 = document.createElement("div");
            div2.className = "image-container";
            var img2 = new Image();
            img1.src = demonArr[i].imageAddress;
            outCell1 = demonArr[i].name;
            outCell2 = demonArr[i].ability;
            if(demonArr.length > i+1){
                img2.src = demonArr[i+1].imageAddress;
                outCell4 = demonArr[i+1].name;
                outCell5 = demonArr[i+1].ability;
            };
            img1.style.width = imageWidth;
            img2.style.width = imageWidth;
            div1.appendChild(img1);
            newRow.append($("<td>").append(div1)).attr("class", "referenceTableName");
            newRow.append($("<td>").text(outCell1)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell2)).attr("class","referenceTableAbility");
            div2.appendChild(img2);
            newRow.append($("<td>").append(div2)).attr("class", "referenceTableName");
            newRow.append($("<td>").text(outCell4)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell5)).attr("class","referenceTableAbility");
            $(demonTable).append(newRow);
            i++;
        };
        //**********Travelers**********
        var selectedTrv = [...travelerList.options]
                .filter(option => option.selected)
                .map(option => option.value);
        var travelerArr = [];
        for(var j=0; j<selectedTrv.length; j++){
            for(var k=0; k<response.length; k++){
                if(response[k].name === selectedTrv[j]){
                    var character = {
                        name: response[k].name,
                        imageAddress: response[k].imageAddress,
                        ability: response[k].ability
                    };
                    travelerArr.push(character);
                    characters.push(response[k].name);
                };
            };
        };
        //**********Night Order Player Sheet**********
        //*****First Night Numbering Scheme***********
        //*****Travelers 1-100************************
        //*****Pre-Evil pt1 101-149*******************
        //*****Minions 150****************************
        //*****Pre-Evil pt2 151-199*******************
        //*****Demon 200******************************
        //*****Affect Others 201-300******************
        //*****Info 301-400***************************
        //*****End of Night 401-500*******************
        //********************************************
        //*****Other Night Numbering Scheme***********
        //*****Travelers 1-100************************
        //*****Not-Poisoned pt1 101-200***************
        //*****Affect Others 201-300******************
        //*****Demons 301-400*************************
        //*****Other Deaths 401-500*******************
        //*****Info 501-600***************************
        //*****End of Night 601-700*******************
        //********************************************
        characters.push("Demon Info");
        characters.push("Minion Info");
        characters.push("Traveler Info");
        var firstNightArr = [];
        var otherNightArr = [];
        for(var i=1; i<700; i++){
            for(var j=0; j<characters.length; j++){
                for(var k=0; k<response.length; k++){
                    if((response[k].firstNight === i) && (response[k].name === characters[j])){
                        var character = {
                            name: response[k].name,
                            imageAddress: response[k].imageAddress,
                            reminder: response[k].firstNightReminder
                        };
                        firstNightArr.push(character);
                    };
                    if((response[k].otherNight === i) && (response[k].name === characters[j])){
                        var character = {
                            name: response[k].name,
                            imageAddress: response[k].imageAddress,
                            reminder: response[k].otherNightReminder
                        };
                        otherNightArr.push(character)
                    }
                };
            };
        };
        //****Player Night Sheet Data*****
        const playerFirstNightTable = document.querySelector("#playerFirstNightOrder");
        const playerOtherNightTable = document.querySelector("#playerOtherNightOrder");
        playerFirstNightTable.innerHTML = "";
        var headerRow = playerFirstNightTable.insertRow(0);
        var headerCell = headerRow.insertCell(0);
        headerCell.colSpan = "4";
        headerCell.innerHTML = "First Night";
        headerCell.setAttribute("class", "nightReferenceTableHeader");
        for(var i=0, j=Math.ceil(firstNightArr.length/2), k=Math.ceil(otherNightArr.length/2); i<Math.ceil(firstNightArr.length/2) && i<Math.ceil(otherNightArr.length/2); i++, j++, k++){       
            var newRow = $("<tr>");
            var outCell0 = "";
            var div1 = document.createElement("div");
            div1.className = "image-container";
            var img1 = new Image();
            var outCell1 = "";
            var outCell2 = "";
            var div2 = document.createElement("div");
            div2.className = "image-container";
            var img2 = new Image();
            var outCell3 = "";
            if(i<Math.ceil(firstNightArr.length/2)){
                if(firstNightArr[i].name === "Traveler Info" || firstNightArr[i].name === "Minion Info" || firstNightArr[i].name === "Demon Info"){
                    newRow.append($("<td>").text(outCell0)).attr("class", "nightReferenceTableName");
                    outCell1 = firstNightArr[i].name;
                    newRow.append($("<td>").text(outCell1)).attr("class", "nightReferenceTableName");
                } else {
                    img1.src = firstNightArr[i].imageAddress;
                    img1.style.width = imageWidth;
                    div1.appendChild(img1);
                    newRow.append($("<td>").append(div1)).attr("class", "nightReferenceTableName");
                    outCell1 = firstNightArr[i].name;
                    newRow.append($("<td>").text(outCell1)).attr("class","nightReferenceTableName");
                };
            };
            if(j<firstNightArr.length){
                if(firstNightArr[j].name === "Traveler Info" || firstNightArr[j].name === "Minion Info" || firstNightArr[j].name === "Demon Info"){
                    newRow.append($("<td>").text(outCell2)).attr("class", "nightReferenceTableName");
                    outCell3 = firstNightArr[j].name;
                    newRow.append($("<td>").text(outCell3)).attr("class", "nightReferenceTableName");
                } else {
                    img2.src = firstNightArr[j].imageAddress;
                    img2.style.width = imageWidth;
                    div2.appendChild(img2);
                    newRow.append($("<td>").append(div2)).attr("class", "nightReferenceTableName");
                    outCell3 = firstNightArr[j].name;
                    newRow.append($("<td>").text(outCell3)).attr("class","nightReferenceTableName");
                };
            };
            $(playerFirstNightTable).append(newRow);
        };
        playerOtherNightTable.innerHTML = "";
        var headerRow = playerOtherNightTable.insertRow(0);
        var headerCell = headerRow.insertCell(0);
        headerCell.colSpan = "4";
        headerCell.innerHTML = "Other Nights";
        headerCell.setAttribute("class", "nightReferenceTableHeader");
        for(var i=0, j=Math.ceil(firstNightArr.length/2), k=Math.ceil(otherNightArr.length/2); i<Math.ceil(firstNightArr.length/2) && i<Math.ceil(otherNightArr.length/2); i++, j++, k++){       
            var newRow = $("<tr>");
            var outCell4 = "";
            var div3 = document.createElement("div");
            div3.className = "image-container";
            var img3 = new Image();
            var outCell5 = "";
            var outCell6 = "";
            var div4 = document.createElement("div");
            div4.className = "image-container";
            var img4 = new Image();
            var outCell7 = "";
            if(i<Math.ceil(otherNightArr.length/2)){
                if(otherNightArr[i].name === "Traveler Info"){
                    newRow.append($("<td>").text(outCell4)).attr("class", "nightReferenceTableName");
                    outCell5 = otherNightArr[i].name;
                    newRow.append($("<td>").text(outCell5)).attr("class", "nightReferenceTableName");
                } else {
                    img3.src = otherNightArr[i].imageAddress;
                    img3.style.width = imageWidth;
                    div3.appendChild(img3);
                    newRow.append($("<td>").append(div3)).attr("class", "nightReferenceTableName");
                    outCell5 = otherNightArr[i].name;
                    newRow.append($("<td>").text(outCell5)).attr("class","nightReferenceTableName");
                };
            };
            if(k<otherNightArr.length){
                if(otherNightArr[k].name === "Traveler Info"){
                    newRow.append($("<td>").text(outCell6)).attr("class", "nightReferenceTableName");
                    outCell6 = otherNightArr[k].name;
                    newRow.append($("<td>").text(outCell7)).attr("class", "nightReferenceTableName");
                } else {
                    img4.src = otherNightArr[k].imageAddress;
                    img4.style.width = imageWidth;
                    div4.appendChild(img4);
                    newRow.append($("<td>").append(div4)).attr("class", "nightReferenceTableName");
                    outCell7 = otherNightArr[k].name;
                    newRow.append($("<td>").text(outCell7)).attr("class","nightReferenceTableName");
                };
            };
            $(playerOtherNightTable).append(newRow);
        };
        //**********Travelers**********
        const travelerTable = document.querySelector("#playerSheetTrvData");
        travelerTable.innerHTML = "";
        var headerRow = travelerTable.insertRow(0);
        var headerCell = headerRow.insertCell(0);
        headerCell.colSpan = "6";
        headerCell.innerHTML = "------------------------------------------------------------------Travelers---------------------------------------------------------------------------";
        for(var i=0; i<travelerArr.length; i++){           
            var newRow = $("<tr>");
            var outCell1 = "";
            var outCell2 = "";
            var outCell4 = "";
            var outCell5 = "";
            var div1 = document.createElement("div");
            div1.className = "image-container";
            var img1 = new Image();
            var div2 = document.createElement("div");
            div2.className = "image-container";
            var img2 = new Image();
            img1.src = travelerArr[i].imageAddress;
            outCell1 = travelerArr[i].name;
            outCell2 = travelerArr[i].ability;
            if(travelerArr.length > i+1){
                img2.src = travelerArr[i+1].imageAddress;
                outCell4 = travelerArr[i+1].name;
                outCell5 = travelerArr[i+1].ability;
            };
            img1.style.width = imageWidth;
            img2.style.width = imageWidth;
            div1.appendChild(img1);
            newRow.append($("<td>").append(div1)).attr("class", "referenceTableName");
            newRow.append($("<td>").text(outCell1)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell2)).attr("class","referenceTableAbility");
            div2.appendChild(img2);
            newRow.append($("<td>").append(div2)).attr("class", "referenceTableName");
            newRow.append($("<td>").text(outCell4)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell5)).attr("class","referenceTableAbility");
            $(travelerTable).append(newRow);
            i++;
        };
        //***********Jinxes************
        var jinxarr = [];
        for (var i=0; i<characters.length; i++){
            for(var j=0; j<response.length; j++){
                if((response[j].name === characters[i]) && (response[j].jinx1 != "undefined")){
                    for (var k=0; k<characters.length; k++){
                        if(response[j].jinx1 === characters[k]) {
                            for(var l=j+1; l<response.length; l++){
                                if(response[l].name === characters[k]) {
                                    var character = {
                                        name: response[j].name,
                                        imageAddress: response[j].imageAddress,
                                        name2: response[l].name,
                                        imageAddress2: response[l].imageAddress,
                                        jinxText: response[j].jinx1Text
                                    };
                                    jinxarr.push(character);
                                };
                            };
                        };
                    };
                    if(response[j].jinx2 != "undefined"){
                        for (var k=0; k<characters.length; k++){
                            if(response[j].jinx2 === characters[k]) {
                                for(var l=j+1; l<response.length; l++){
                                    if(response[l].name === characters[k]) {
                                        var character = {
                                            name: response[j].name,
                                            imageAddress: response[j].imageAddress,
                                            name2: response[l].name,
                                            imageAddress2: response[l].imageAddress,
                                            jinxText: response[j].jinx2Text
                                        };
                                        jinxarr.push(character);
                                    };
                                };
                            };
                        };
                    };
                    if(response[j].jinx3 != "undefined"){
                        for (var k=0; k<characters.length; k++){
                            if(response[j].jinx3 === characters[k]) {
                                for(var l=j+1; l<response.length; l++){
                                    if(response[l].name === characters[k]) {
                                        var character = {
                                            name: response[j].name,
                                            imageAddress: response[j].imageAddress,
                                            name2: response[l].name,
                                            imageAddress2: response[l].imageAddress,
                                            jinxText: response[j].jinx3Text
                                        };
                                        jinxarr.push(character);
                                    };
                                };
                            };
                        };
                    };
                    if(response[j].jinx4 != "undefined"){
                        for (var k=0; k<characters.length; k++){
                            if(response[j].jinx4 === characters[k]) {
                                for(var l=j+1; l<response.length; l++){
                                    if(response[l].name === characters[k]) {
                                        var character = {
                                            name: response[j].name,
                                            imageAddress: response[j].imageAddress,
                                            name2: response[l].name,
                                            imageAddress2: response[l].imageAddress,
                                            jinxText: response[j].jinx4Text
                                        };
                                        jinxarr.push(character);
                                    };
                                };
                            };
                        };
                    };
                    if(response[j].jinx5 != "undefined"){
                        for (var k=0; k<characters.length; k++){
                            if(response[j].jinx5 === characters[k]) {
                                for(var l=j+1; l<response.length; l++){
                                    if(response[l].name === characters[k]) {
                                        var character = {
                                            name: response[j].name,
                                            imageAddress: response[j].imageAddress,
                                            name2: response[l].name,
                                            imageAddress2: response[l].imageAddress,
                                            jinxText: response[j].jinx5Text
                                        };
                                        jinxarr.push(character);
                                    };
                                };
                            };
                        };
                    };
                    if(response[j].jinx6 != "undefined"){
                        for (var k=0; k<characters.length; k++){
                            if(response[j].jinx6 === characters[k]) {
                                for(var l=j+1; l<response.length; l++){
                                    if(response[l].name === characters[k]) {
                                        var character = {
                                            name: response[j].name,
                                            imageAddress: response[j].imageAddress,
                                            name2: response[l].name,
                                            imageAddress2: response[l].imageAddress,
                                            jinxText: response[j].jinx6Text
                                        };
                                        jinxarr.push(character);
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        const jinxTable = document.querySelector("#jinxData");
        jinxTable.innerHTML = "";
        var headerRow = jinxTable.insertRow(0);
        var headerCell = headerRow.insertCell(0);
        headerCell.colSpan = "6";
        if(jinxarr.length>0){
            headerCell.innerHTML = "------------------------------------------------------------------Jinxes---------------------------------------------------------------------------";
        } else {
            headerCell.innerHTML = "---------------------------------------------------There are no Jinxes on this script--------------------------------------------------------------";
        };        
        for(var i=0; i<jinxarr.length; i++){           
            var newRow = $("<tr>");
            var div1 = document.createElement("div");
            div1.className = "image-container";
            var img1 = new Image();
            var div2 = document.createElement("div");
            div2.className = "image-container";
            var img2 = new Image();
            var outCell2 = "";
            var div3 = document.createElement("div");
            div3.className = "image-container";
            var img3 = new Image();
            var div4 = document.createElement("div");
            div4.className = "image-container";
            var img4 = new Image();
            var outCell5 = "";
            img1.src = jinxarr[i].imageAddress;
            img2.src = jinxarr[i].imageAddress2;
            outCell2 = jinxarr[i].jinxText;
            if(jinxarr.length > i+1){
                img3.src = jinxarr[i+1].imageAddress;
                img4.src = jinxarr[i+1].imageAddress2;
                outCell5 = jinxarr[i+1].jinxText;
            };
            img1.style.width = imageWidth;
            img2.style.width = imageWidth;
            img3.style.width = imageWidth;
            img4.style.width = imageWidth;
            div1.appendChild(img1);
            newRow.append($("<td>").append(div1)).attr("class", "referenceTableName");
            div2.appendChild(img2);
            newRow.append($("<td>").append(div2)).attr("class", "referenceTableName");
            newRow.append($("<td>").text(outCell2)).attr("class","referenceTableAbility");
            div3.appendChild(img3);
            newRow.append($("<td>").append(div3)).attr("class", "referenceTableName");
            div4.appendChild(img4);
            newRow.append($("<td>").append(div4)).attr("class", "referenceTableName");
            newRow.append($("<td>").text(outCell5)).attr("class","referenceTableAbility");
            $(jinxTable).append(newRow);
            i++;
        };
        //****First Night ST Sheet*****
        const storyTellerFirstNightTable = document.querySelector("#storyTellerFirstNightSheet");
        storyTellerFirstNightTable.innerHTML = "";
        var headerRow = storyTellerFirstNightTable.insertRow(0);
        var headerCell = headerRow.insertCell(0);
        headerCell.colSpan = "4";
        headerCell.innerHTML = "First Night";
        headerCell.setAttribute("class", "nightReferenceTableHeader");
        for(var i=0; i<firstNightArr.length; i++){       
            var newRow = $("<tr>");
            var outCell0 = "";
            var div1 = document.createElement("div");
            div1.className = "image-container";
            var img1 = new Image();
            var outCell1 = "";
            var outCell2 = "";
            if(firstNightArr[i].name === "Traveler Info" || firstNightArr[i].name === "Minion Info" || firstNightArr[i].name === "Demon Info"){
                newRow.append($("<td>").text(outCell0)).attr("class", "nightReferenceTableName");
                outCell1 = firstNightArr[i].name;
                outCell2 = firstNightArr[i].reminder;
                newRow.append($("<td>").text(outCell1)).attr("class", "nightReferenceTableName");
                newRow.append($("<td>").text(outCell2)).attr("class", "nightReferenceTableAbility");
            } else {
                img1.src = firstNightArr[i].imageAddress;
                img1.style.width = imageWidth;
                div1.appendChild(img1);
                newRow.append($("<td>").append(div1)).attr("class", "nightReferenceTableName");
                outCell1 = firstNightArr[i].name;
                outCell2 = firstNightArr[i].reminder;
                newRow.append($("<td>").text(outCell1)).attr("class","nightReferenceTableName");
                newRow.append($("<td>").text(outCell2)).attr("class", "nightReferenceTableAbility");
            };
            $(storyTellerFirstNightTable).append(newRow);
        };
        //****Other Night ST Sheet*****
        const storyTellerOtherNightTable = document.querySelector("#storyTellerOtherNightSheet");
        storyTellerOtherNightTable.innerHTML = "";
        var headerRow = storyTellerOtherNightTable.insertRow(0);
        var headerCell = headerRow.insertCell(0);
        headerCell.colSpan = "4";
        headerCell.innerHTML = "Other Nights";
        headerCell.setAttribute("class", "nightReferenceTableHeader");
        for(var i=0; i<otherNightArr.length; i++){       
            var newRow = $("<tr>");
            var outCell4 = "";
            var div3 = document.createElement("div");
            div3.className = "image-container";
            var img3 = new Image();
            var outCell5 = "";
            var outCell6 = "";
            var div4 = document.createElement("div");
            div4.className = "image-container";
            var img4 = new Image();
            var outCell7 = "";
            if(i<Math.ceil(otherNightArr.length/2)){
                if(otherNightArr[i].name === "Traveler Info"){
                    newRow.append($("<td>").text(outCell4)).attr("class", "nightReferenceTableName");
                    outCell5 = otherNightArr[i].name;
                    outCell6 = otherNightArr[i].reminder;
                    newRow.append($("<td>").text(outCell5)).attr("class", "nightReferenceTableName");
                    newRow.append($("<td>").text(outCell6)).attr("class", "nightReferenceTableAbility");
                } else {
                    img3.src = otherNightArr[i].imageAddress;
                    img3.style.width = imageWidth;
                    div3.appendChild(img3);
                    newRow.append($("<td>").append(div3)).attr("class", "nightReferenceTableName");
                    outCell5 = otherNightArr[i].name;
                    outCell6 = otherNightArr[i].reminder;
                    newRow.append($("<td>").text(outCell5)).attr("class","nightReferenceTableName");
                    newRow.append($("<td>").text(outCell6)).attr("class", "nightReferenceTableAbility");
                };
            };
            $(storyTellerOtherNightTable).append(newRow);
        };
    };
    httpRequest.open('GET','ScriptbuilderData.json',true);
    httpRequest.send();
});
