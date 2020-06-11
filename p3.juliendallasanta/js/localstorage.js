const saveToLocalStorage = ()=>{
    var eltToSave = $(".storage");
    for(var i=0; i<=eltToSave.length-1; i++){
        var eltId = eltToSave[i].getAttribute('id');
        localStorage.setItem(eltId, eltToSave[i].value);
    }
}
