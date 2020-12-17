const backend_blueprint = {
    "name": "first-app",
    "flows": [{
        "start": "a",
        "location": "backend",
        "blocks":[{
            "id": "a",
            "class": "onBackend",
            "edges": {
                "success": "b",
                "failure": "b"
            },
            "arguments":{
            event: "onTicketCreate"
            }
        },
        {
        "id": "b",
            "class": "ifelse",
            "edges": {
                "success": "c",
                "failure": "c"
            },
            "arguments":{
            "op": "==",
            "left": "{{global.result.subject}}",
            "right": "someValue"
            }
        },
        {
        "id": "c",
        "class": "request",
        "edges": {
        },
        "arguments":{
        "domain":"fw-hackathon.myshopify.com",
        "api_key":"9c1cfbe80eaad256d7a2c30f9a99d385",
        "password": "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",
        "item_name": "{{global.result.subject}}",
        "quantity":"2"
        },
        "response": "Call suceeded"
    }]
    }]
}
    
const frontend_blueprint = {
    "name": "first-app",
    "flows": [{
        "start": "a",
        "location": "frontend",
        "blocks":[{
            "id": "a",
            "class": "request",
            "edges": {
                "success": "b",
                "failure": "c"
            },
            "arguments":{
            "url": "https://www.google.co.in/",
            "method": "get"
            },
            "response": "Call suceeded"
        },{
            "id": "b",
            "class": "notify",
            "edges": {},
            "arguments": {
                "message": "Suceeded",
                "type": "info"
            }
        },
        {
            "id": "c",
            "class": "notify",
            "edges": {},
            "arguments": {
                "message": "failed.",
                "type": "danger"
            }
        }]
    }]
}
    

window.generateApp = function(blueprint) {
    const app = require('cheney')({
        flows: blueprint.flows,
        iparams:  blueprint.configs || []
    });

    const appZip = new JSZip();

    Object
        .keys(app)
        .forEach(file => {
            appZip.file(file, app[file]);
        });

        appZip.generateAsync({
        type: 'blob'
        }).then(contentBlob => {
        const link = document.createElement('a');

        link.href = window.URL.createObjectURL(contentBlob);
        link.name = app.name;
        link.dispatchEvent(new MouseEvent('click'));
    });
};