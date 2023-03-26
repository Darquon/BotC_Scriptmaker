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
        var line = 1;
        var characters = [];
        //**********ScriptName**********
        scriptName = scriptNameInput.value;
        var scriptNameOutput = scriptName;
        for(var i=131-scriptNameOutput.length; i>0; i--){
            scriptNameOutput = scriptNameOutput + "-";
        };
        //**********Townsfolk**********
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
        for(var i=1; i<100; i++){
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
            var img1 = new Image();
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
            newRow.append(img1);
            newRow.append($("<td>").text(outCell1)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell2)).attr("class","referenceTableAbility");
            newRow.append(img2);
            newRow.append($("<td>").text(outCell4)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell5)).attr("class","referenceTableAbility");
            $(townsfolkTable).append(newRow);
            i++;
        };
        //**********Outsiders**********
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
        for(var i=1; i<100; i++){
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
            var img1 = new Image();
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
            newRow.append(img1);
            newRow.append($("<td>").text(outCell1)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell2)).attr("class","referenceTableAbility");
            newRow.append(img2);
            newRow.append($("<td>").text(outCell4)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell5)).attr("class","referenceTableAbility");
            $(outsiderTable).append(newRow);
            i++;
        };
        //**********Minions**********
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
        for(var i=1; i<100; i++){
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
            var img1 = new Image();
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
            newRow.append(img1);
            newRow.append($("<td>").text(outCell1)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell2)).attr("class","referenceTableAbility");
            newRow.append(img2);
            newRow.append($("<td>").text(outCell4)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell5)).attr("class","referenceTableAbility");
            $(minionTable).append(newRow);
            i++;
        };
        //**********Demons**********
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
        for(var i=1; i<100; i++){
            for(var j=0; j<selectedOut.length; j++){
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
            var img1 = new Image();
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
            newRow.append(img1);
            newRow.append($("<td>").text(outCell1)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell2)).attr("class","referenceTableAbility");
            newRow.append(img2);
            newRow.append($("<td>").text(outCell4)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell5)).attr("class","referenceTableAbility");
            $(demonTable).append(newRow);
            i++;
        };
        //**********Travelers**********
        var selectedTrv = [...travelerList.options]
                .filter(option => option.selected)
                .map(option => option.value);
        const travelerTable = document.querySelector("#playerSheetTrvData");
        travelerTable.innerHTML = "";
        var travlerArr = [];
        for(var i=1; i<100; i++){
            for(var j=0; j<selectedOut.length; j++){
                for(var k=0; k<response.length; k++){
                    if((response[k].sheetOrder === i) && (response[k].name === selectedTrv[j])){
                        var character = {
                            name: response[k].name,
                            imageAddress: response[k].imageAddress,
                            ability: response[k].ability
                        };
                        travlerArr.push(character);
                        characters.push(response[k].name);
                    };
                };
            };
        };


        // Night Sheet: divide by two and floor.



        /*for(var i=0; i<travlerArr.length; i++){           
            var newRow = $("<tr>");
            var outCell1 = "";
            var outCell2 = "";
            var outCell4 = "";
            var outCell5 = "";
            var img1 = new Image();
            var img2 = new Image();
            img1.src = travlerArr[i].imageAddress;
            outCell1 = travlerArr[i].name;
            outCell2 = travlerArr[i].ability;
            if(travlerArr.length > i+1){
                img2.src = travlerArr[i+1].imageAddress;
                outCell4 = travlerArr[i+1].name;
                outCell5 = travlerArr[i+1].ability;
            };
            img1.style.width = imageWidth;
            img2.style.width = imageWidth;
            newRow.append(img1);
            newRow.append($("<td>").text(outCell1)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell2)).attr("class","referenceTableAbility");
            newRow.append(img2);
            newRow.append($("<td>").text(outCell4)).attr("class","referenceTableName");
            newRow.append($("<td>").text(outCell5)).attr("class","referenceTableAbility");
            $(travelerTable).append(newRow);
            i++;
        };*/

        /*
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
        
        //*****First Night
        characters.push("Demon Info");
        characters.push("Minion Info");
        characters.push("Traveler Info");
        line = 1;
        for(var i=1; i<600; i++){
            for(var j=0; j<characters.length; j++){
                for(var k=0; k<response.length; k++){
                    if((response[k].firstNight === i) && (response[k].name === characters[j])){
                        if(line<35){
                            charImage = document.getElementById('firstNightImage'+line);
                            charImage.src = response[k].imageAddress;
                            charImage = document.getElementById('firstNightSheetImage'+line);
                            charImage.src = response[k].imageAddress;
                        };
                        $('.firstNightName'+line).html(line + " " + response[k].name);
                        $('.firstNightAbility'+line).html(line + " " + response[k].firstNightReminder);
                        line++;
                    };
                };
            };
        };

        //*****Other Nights
        line = 1;
        for(var i=1; i<800; i++){
            for(var j=0; j<characters.length; j++){
                for(var k=0; k<response.length; k++){
                    if((response[k].otherNight === i) && (response[k].name === characters[j])){
                        if(line<35){
                            charImage = document.getElementById('otherNightImage'+line);
                            charImage.src = response[k].imageAddress;
                            charImage = document.getElementById('otherNightSheetImage'+line);
                            charImage.src = response[k].imageAddress;
                        };
                        $('.otherNightName'+line).html(line + " " + response[k].name);
                        $('.otherNightAbility'+line).html(line + " " + response[k].otherNightReminder);
                        line++;
                    };
                };
            };
        };
        //*****Jinx Code
        line = 1;
        for (var i=0; i<characters.length; i++){
            for(var j=0; j<response.length; j++){
                if((response[j].name === characters[i]) && (response[j].jinx1 != "undefined")){
                    for (var k=0; k<characters.length; k++){
                        if(response[j].jinx1 === characters[k]) {
                            console.log("i:" + characters[i] + " j:" + response[j].name + " & jinx1=" + response[j].jinx1 + " k:" + characters[k]);
                            if(line<35){
                                charImage = document.getElementById('jinxImage'+line+"a");
                                charImage.src = response[j].imageAddress;
                                for(var l=j+1; l<response.length; l++){
                                    if(response[l].name === characters[k]) {
                                        charImage = document.getElementById('jinxImage'+line+"b");
                                        charImage.src = response[l].imageAddress;
                                    };
                                };
                                $('.jinxText'+line).html(response[j].jinx1Text);
                                line++
                            };
                        };
                    };
                    if(response[j].jinx2 != "undefined"){
                        for (var k=0; k<characters.length; k++){
                            if(response[j].jinx2 === characters[k]) {
                                console.log("i:" + characters[i] + " j:" + response[j].name + " & jinx2=" + response[j].jinx1 + " k:" + characters[k]);
                                if(line<35){
                                    charImage = document.getElementById('jinxImage'+line+"a");
                                    charImage.src = response[j].imageAddress;
                                    for(var l=j+1; l<response.length; l++){
                                        if(response[l].name === characters[k]) {
                                            charImage = document.getElementById('jinxImage'+line+"b");
                                            charImage.src = response[l].imageAddress;
                                        };
                                    };
                                    $('.jinxText'+line).html(response[j].jinx2Text);
                                    line++
                                };
                            };
                        };
                    };
                    if(response[j].jinx3 != "undefined"){
                        for (var k=0; k<characters.length; k++){
                            if(response[j].jinx3 === characters[k]) {
                                console.log("i:" + characters[i] + " j:" + response[j].name + " & jinx3=" + response[j].jinx1 + " k:" + characters[k]);
                                if(line<35){
                                    charImage = document.getElementById('jinxImage'+line+"a");
                                    charImage.src = response[j].imageAddress;
                                    for(var l=j+1; l<response.length; l++){
                                        if(response[l].name === characters[k]) {
                                            charImage = document.getElementById('jinxImage'+line+"b");
                                            charImage.src = response[l].imageAddress;
                                        };
                                    };
                                    $('.jinxText'+line).html(response[j].jinx3Text);
                                    line++
                                };
                            };
                        };
                    };
                    if(response[j].jinx4 != "undefined"){
                        for (var k=0; k<characters.length; k++){
                            if(response[j].jinx4 === characters[k]) {
                                console.log("i:" + characters[i] + " j:" + response[j].name + " & jinx4=" + response[j].jinx1 + " k:" + characters[k]);
                                if(line<35){
                                    charImage = document.getElementById('jinxImage'+line+"a");
                                    charImage.src = response[j].imageAddress;
                                    for(var l=j+1; l<response.length; l++){
                                        if(response[l].name === characters[k]) {
                                            charImage = document.getElementById('jinxImage'+line+"b");
                                            charImage.src = response[l].imageAddress;
                                        };
                                    };
                                    $('.jinxText'+line).html(response[j].jinx4Text);
                                    line++
                                };
                            };
                        };
                    };
                    if(response[j].jinx5 != "undefined"){
                        for (var k=0; k<characters.length; k++){
                            if(response[j].jinx5 === characters[k]) {
                                console.log("i:" + characters[i] + " j:" + response[j].name + " & jinx5=" + response[j].jinx1 + " k:" + characters[k]);
                                if(line<35){
                                    charImage = document.getElementById('jinxImage'+line+"a");
                                    charImage.src = response[i].imageAddress;
                                    for(var l=j+1; l<response.length; l++){
                                        if(response[l].name === characters[k]) {
                                            charImage = document.getElementById('jinxImage'+line+"b");
                                            charImage.src = response[l].imageAddress;
                                        };
                                    };
                                    $('.jinxText'+line).html(response[j].jinx5Text);
                                    line++
                                };
                            };
                        };
                    };
                    if(response[j].jinx6 != "undefined"){
                        for (var k=0; k<characters.length; k++){
                            if(response[j].jinx6 === characters[k]) {
                                console.log("i:" + characters[i] + " j:" + response[j].name + " & jinx6=" + response[j].jinx1 + " k:" + characters[k]);
                                if(line<35){
                                    charImage = document.getElementById('jinxImage'+line+"a");
                                    charImage.src = response[i].imageAddress;
                                    for(var l=j+1; l<response.length; l++){
                                        if(response[l].name === characters[k]) {
                                            charImage = document.getElementById('jinxImage'+line+"b");
                                            charImage.src = response[l].imageAddress;
                                        };
                                    };
                                    $('.jinxText'+line).html(response[j].jinx6Text);
                                    line++
                                };
                            };
                        };
                    };
                };
            };
        };*/
    };
    httpRequest.open('GET','ScriptbuilderData.json',true);
    httpRequest.send();
});
