/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7
Version: 2.1.0
Author: paulo cezar luz

*/
var tabelamedicos;
var dadosconsulta = [];
//----------------------------------------------------------------------------------------------
//FUNCÕES DE CONSULTAS--------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
function GetMedicosCodigo(codigo) { //função para carregar os dados medico usando xhr    

    //nessa função não precisa de validar limite de caracteres

    var xmlhttp = new XMLHttpRequest(); //xhr
    xmlhttp.timeout = 10000;
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                myObj = null;
                myObj = JSON.parse(this.responseText);
                if (typeof myObj[0] == "undefined") {
                    beep();
                    swal({ //verificar se os dados não foram encontrados, depois de ter inserido
                        type: 'error',
                        title: 'ERRO',
                        text: 'DADOS NÃO ENCONTRADOS',
                    });
                } else {
                    //ENCHER O MODAL COM OS DADOS DO RESULTADO
                    document.getElementById("cdCtr").value = myObj[0].cdCtr;
                    document.getElementById("nmMedico").value = myObj[0].nmMedico;
                    document.getElementById("cdEspecialidade").selectedIndex = myObj[0].cdEspecialidade;
                    document.getElementById("cdTpDoc").selectedIndex = myObj[0].cdTpDoc; 
                    document.getElementById("cep").value = myObj[0].cep;
                    document.getElementById("nrDoc").value = myObj[0].nrDoc;                  
					document.getElementById("cdCid").value = myObj[0].cdCid;					
                    document.getElementById("stDoc").selectedIndex = myObj[0].stDoc;
                    document.getElementById("ufDoc").value = myObj[0].ufDoc;

                }

            } else {
                var sstatus = this.status + ' - Erro não tratado'; //verificando se o servidor está offline
                switch (this.status) {
                    case 0:
                        sstatus = "Erro na conexão"
                        break;
                    case 404:
                        sstatus = "404 - A URL informada não e válida ou servidor fora do ar"
                        break;
                    case 401:
                        sstatus = "401 - Acesso negado"
                        break;

                    case 500:
                        sstatus = "500 - Erro interno provalvemente parâmetro de consulta não informado"
                        break;
                }


                if (this.status = 0) sstatus = 'Erro na conexão' //se o servidor estiver fora do ar:
                swal({
                    type: 'error',
                    title: 'ERRO',
                    text: 'Erro ' + sstatus,
                });
            }


        };

    };

    xmlhttp.open("GET", 'http://177.72.161.135:9180/soa/esb/cupom/glbMedicos?obj={"cdCtr":' + codigo + '}', true);
    xmlhttp.send();
    //xhr get method
}

function cadastrarMedico() { //função para postar o codigo de barras
    //CARREGAR AS VARIAVEIS DIGITADAS
    var cdCtr = document.getElementById("cdCtr").value;
    var cdEmp = 1;
    var nmMedico = document.getElementById("nmMedico").value;
    var cdEspecialidade = document.getElementById("cdEspecialidade").selectedIndex;
    var cdTpDoc = document.getElementById("cdTpDoc").selectedIndex;
    var cep = document.getElementById("cep").value;
    var nrDoc = document.getElementById("nrDoc").value;
    var cdCid = document.getElementById("cdCid").selectedIndex;
    var stDoc = document.getElementById("stDoc").selectedIndex;
    var ufDoc = document.getElementById("ufDoc").selectedIndex;
    var cdUsu = 1;
    //MONTAR O JASSON
    var myObj = {};
    var obj = []
    myObj.obj = obj;

    var dados = {
        "cdCtr": cdCtr,
        "cdEmp": cdEmp,
        "nmMedico": nmMedico,
        "cdEspecialidade": cdEspecialidade,
        "cdTpDoc": cdTpDoc,
        "cep": cep,
        "nrDoc": nrDoc,
        "cdCid": cdCid,
        "stDoc": stDoc,
        "ufDoc": ufDoc,
        "cdUsu=": cdUsu


    }
    myObj.obj.push(dados);
    var msgServer;
    var xmlhttp = new XMLHttpRequest(); //xhr
    var url = "http://177.72.161.135:9180/soa/esb/cupom/glbMedicos"
    var params = JSON.stringify(myObj);
    xmlhttp.timeout = 10000;
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            msgServer = this.responseText;
            if (this.status == 200) {
                myObj = null;
                myObj = JSON.parse(this.responseText);
                if (typeof myObj[0] == "undefined") {
                    beep();
                    swal({ //verificar se os dados não foram encontrados, depois de ter inserido
                        type: 'error',
                        title: 'ERRO',
                        text: 'DADOS NÃO CADASTRADOS',
                    });

                } else {

                    swal({ //verificar se os dados não foram encontrados, depois de ter inserido
                        type: 'SUCESSS',
                        title: 'SUCESSO',
                        text: 'OS DADOS FORAM CADASTRADOS',
                    });

                }
            } else {
                var sstatus = this.status + ' Erro nao tratado'; //verificando se o servidor está offline
                switch (this.status) {
                    case 0:
                        sstatus = "Timeout de conexão"
                        break;
                    case 404:
                        sstatus = "404 - A url informada não é válida ou servidor fora do ar"
                        break;
                    case 401:
                        sstatus = "401 - "+ msgServer;
                        break;

                    case 500:
                        sstatus = "500 - "+ msgServer;
                        break;
                    case 599:
                        sstatus = "599 - Erro ao cadastrar " + msgServer;
                        break;
                }


                if (this.status = 0) sstatus = 'Timeout de conexão' //se o servidor estiver fora do ar:
                swal({
                    type: 'error',
                    title: 'ERRO',
                    text: 'Erro ' + sstatus,
                });
            }


        };

    };

    xmlhttp.open("POST", url, true); //ABRIR A CONEXAO COM O 
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(params); //PASSAR O JASOM PARA O SERVIDOR
}


function GetMedicos(nmMedico) { //função para carregar os dados medico usando xhr    

    //nessa função não precisa de validar limite de caracteres

    var xmlhttp = new XMLHttpRequest(); //xhr
    xmlhttp.timeout = 10000;
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                myObj = null;
                myObj = JSON.parse(this.responseText);
                if (typeof myObj[0] == "undefined") {
                    beep();
                    swal({ //verificar se os dados não foram encontrados, depois de ter inserido
                        type: 'error',
                        title: 'ERRO',
                        text: 'DADOS NÃO ENCONTRADOS',
                    });
                } else {
                    tabelamedicos.clear();
                    criarTabela(myObj); //se os dados forem encontrados, referenciar modal e DataTables
                    tabelamedicos.clear();
                    tabelamedicos.rows.add(dadosconsulta);
                    tabelamedicos.draw();

                }

            } else {
                var sstatus = this.status + ' - Erro não tratado'; //verificando se o servidor está offline
                switch (this.status) {
                    case 0:
                        sstatus = "Erro na conexão"
                        break;
                    case 404:
                        sstatus = "404 - A URL informada não e válida ou servidor fora do ar"
                        break;
                    case 401:
                        sstatus = "401 - Acesso negado"
                        break;

                    case 500:
                        sstatus = "500 - Erro interno provalvemente parâmetro de consulta não informado"
                        break;
                }


                if (this.status = 0) sstatus = 'Erro na conexão' //se o servidor estiver fora do ar:
                swal({
                    type: 'error',
                    title: 'ERRO',
                    text: 'Erro ' + sstatus,
                });
            }


        };

    };

    xmlhttp.open("GET", 'http://177.72.161.135:9180/soa/esb/cupom/glbMedicos?obj={"nmMedico":"' + nmMedico + '"}', true);
    xmlhttp.send();
    //xhr get method
}
//----------------------------------------------------------------------------------------------
//FUNCÕES PARA INTERAÇÃO COM O HTML-------------------------------------------------------------
//----------------------------------------------------------------------------------------------
function criarTabela(conteudo) { //estrutura de como a tabela será feita
    //ESTA FUNÇAO PREPARA O JSSON QUE IRA ALIMENTAR A TABELA
    dadosconsulta = [];
    for (var i = 0; i < conteudo.length; i++) {
        var idata = [

            myObj[i].cdCtr,
            myObj[i].nmMedico,
            myObj[i].cdEspecialidade,
            myObj[i].ufDoc,
            '0',
            '',
            '' //coluna vazio para colocar os botoes no grid

        ];
        dadosconsulta.push(idata);

    }
}

function validarcodigo(evt) { //validar se o valor inserido é um código
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        beep();
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
        swal({
            type: 'error',
            title: 'ERRO',
            text: 'SOMENTE CÓDIGOS',
            TableManageCombin
        });
    }
}
function cadastrarnovo() {
    $("#modalconsulta").modal();
    GetMedicosCodigo(codigo);
}
function editarmedico(codigo) {
    GetMedicosCodigo(codigo);
    $("#modalconsulta").modal();

}

//----------------------------------------------------------------------------------------------
//INICIALIZAR O DATATABLE-----------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

var handleDataTableCombinationSetting = function() {
    "use strict";

    if ($('#data-table').length !== 0) {
        tabelamedicos = $('#data-table').DataTable({

            dom: 'lBfrtip',
            buttons: [{
                    extend: 'copy',
                    className: 'btn btn-info glyphicon glyphicon-duplicate'
                },

                {
                    extend: 'excel',
                    className: 'btn btn-danger glyphicon glyphicon-list-alt'
                },
                {
                    extend: 'pdf',
                    className: 'btn btn-warning glyphicon glyphicon-file'
                },
                {
                    titleAttr: "Novo",
                    className: "btn btn-success glyphicon glyphicon-save-file",
                    text: "Novo",

                    action: function(e, dt, node, config, pdata) {
                        cadastrarnovo();
                    }
                }



            ],
            responsive: true,
            autoFill: true,
            colReorder: true,
            //keys: true,
            rowReorder: true,
            "aaData": dadosconsulta,


            select: true,
            "aoColumns": [{
                    "sTitle": "Código"
                },
                {
                    "sTitle": "Nome"
                },
                {
                    "sTitle": "Especialidade"
                },
                {
                    "sTitle": "UF"
                },
                {
                    "sTitle": "    "
                },
                {
                    "sTitle": "   "
                }

            ],
            "columnDefs": [{
                    "targets": -2,
                    "data": null,
                    "defaultContent": "<button>Editar</button>",

                },
                {
                    "targets": -1,
                    "data": null,
                    "defaultContent": "<button>Excluir</button>"
                }
            ],

            language: {
                "lengthMenu": "Mostrar  _MENU_  itens ",
                "zeroRecords": "Nada encontrado",
                "info": "Total: _MAX_ Registro(s) -  Pagina:  _PAGE_ /  _PAGES_ ",
                "infoEmpty": "Sem dados",
                "loadingRecords": "Carregando...",
                "processing": "Procesando...",
                "search": "Pesquisa:",
                "infoFiltered": "(Filtrado _TOTAL_ )",
                "select": {
                    "rows": {
                        "0": "",
                        "1": "Selecionado 1 linha",
                        "_": "Selecionados %d linhas"
                    }
                },
                "paginate": {
                    "previous": "Anterior",
                    "next": "Proximo",
                    "last": "Ultima",
                    "First": "Primeira"
                }
            }

        });

        $('#data-table tbody').on('click', 'button', function() {
            var data = tabelamedicos.row($(this).parents('tr')).data();
            editarmedico(data[0]);


        });
    }
};

 TableManageCombine = function() {
    "use strict";
    return {
        //main function
        init: function() {
            handleDataTableCombinationSetting();
        }
    };
}();