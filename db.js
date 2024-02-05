var db;

const initDB = () => {
    let indexDB = indexedDB.open('db_sistema', 1);

    indexDB.onupgradeneeded = e => {
        let req = e.target.result;

        if (!req.objectStoreNames.contains('personas')) {
            let tblPersona = req.createObjectStore('personas', { keyPath: 'idPersona' });
            tblPersona.createIndex('idPersona', 'idPersona', { unique: true });
            tblPersona.createIndex('codigo', 'codigo', { unique: true });
        }
    };

    indexDB.onsuccess = e => {
        db = e.target.result;
    };

    indexDB.onerror = e => {
        console.error('Error al crear o abrir la base de datos', e.target.error);
    };
};

const abrirStore = (store, modo) => {
    let ltx = db.transaction(store, modo);
    return ltx.objectStore(store);
};

initDB();