/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7
Version: 2.1.0
Author: paulo cezar luz

*/
var  tabelamedicos;
var dadosconsulta = [];




function GetMedicos(nmMedico) { //função para carregar os dados medico usando xhr    

    //nessa função não precisa de validar limite de caracteres

    var xmlhttp = new XMLHttpRequest(); //xhr
    xmlhttp.timeout = 10000;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                myObj = null;
                myObj = JSON.parse(this.responseText);
                if (typeof myObj[0] == "undefined") {
                    beep();
                    swal({  //verificar se os dados não foram encontrados, depois de ter inserido
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

function criarTabela(conteudo) { //estrutura de como a tabela será feita

    var tabela = document.getElementById("data-table");
    
    var tbody = document.getElementById("tbodyconsulta");

   // var rowCount = tabela.rows.length;
   // for (var i = rowCount - 1; i > 0; i--) {
   //     tabela.deleteRow(i);
   // }



    for (var i = 0; i < conteudo.length; i++) {
	var idata = [
	
     myObj[i].cdCtr,
	 myObj[i].nmMedico,
	 myObj[i].cdEspecialidade,
	 myObj[i].cdTpDoc,	 
	 myObj[i].nrDoc,
	 myObj[i].cep,
	 myObj[i].cdCid, 
	 myObj[i].stDoc,
	 myObj[i].ufDoc,
     '0',
	 '',
	 ''//coluna vazio para colocar os botoes no grid
	 
    ];
    dadosconsulta.push(idata);	
	

    }
    conteudo = null;
    return tabela;
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
            text: 'SOMENTE CÓDIGOS',TableManageCombin
        });
    }
}
function cadastrarnovo() {
 $("#modalconsulta").modal();
} 

var handleDataTableCombinationSetting = function() {
	"use strict";
    

    
	
    if ($('#data-table').length !== 0) {
    tabelamedicos = $('#data-table').DataTable({
           
			dom: 'lBfrtip',
            buttons: [
					{ extend: 'copy', className: 'btn btn-info glyphicon glyphicon-duplicate' },
					
					{ extend: 'excel', className: 'btn btn-danger glyphicon glyphicon-list-alt' },
					{ extend: 'pdf', className: 'btn btn-warning glyphicon glyphicon-file' }, 
				    { titleAttr:"Novo" ,
     				 className:"btn btn-success glyphicon glyphicon-save-file" ,
				     text:"Novo",
     	            
				     action: function ( e, dt, node, config,pdata ) {cadastrarnovo(); }}

      	
			   
            ],
            responsive: true,
            autoFill: true,
            colReorder: true,
            //keys: true,
            rowReorder: true,
			"aaData": dadosconsulta,			


		   select: true,
			 "aoColumns": [
					{ "sTitle": "Código" },
					{ "sTitle": "Nome" },
					{ "sTitle": "Especialidade" },
					{ "sTitle": "Tp.doc" },
					{ "sTitle": "Nr.Doc" },
					{ "sTitle": "cep" },
					{ "sTitle": "Cód.Cid" },
					{ "sTitle": "Status" },
					{ "sTitle": "UF" },
					{ "sTitle": "    " },
					{ "sTitle": "   " }
   
            ],
		   "columnDefs": [ {
            "targets": -2,
            "data": null,
            "defaultContent": "<button>Editar </button>",
			
             },
             {
            "targets": -1,
            "data": null,
            "defaultContent": "<button>Excluir</button>"
             }
			 ],
			
		    language:{
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
		
        $('#data-table tbody').on( 'click', 'button', function () {
			var data = tabelamedicos.row( $(this).parents('tr') ).data();
			alert('Selecionado : Produto'+ data[0] +"'Codigo de barras: "+ data[ 1 ] );
			
			cadastrarnovo();
			
		} );		
    }
};

function cadastrar() { //função para postar o codigo de barras
     //CARREGAR AS VARIAVEIS DIGITADAS
    var cdCtr = document.getElementById("cdCtr").value; 
    var cdEmp = 1; 
    var nmMedico = document.getElementById("nmMedico").value; 
    var cdEspecialidade = document.getElementById("cdEspecialidade").value; 
    var cdTpDoc = document.getElementById("cdTpDoc").selectedIndex;; 
	var cep = document.getElementById("cep").value; 
    var nrDoc = document.getElementById("cdEspecialidade").value; 
	var cdCid = document.getElementById("cdEspecialidade").value; 
	var stDoc = document.getElementById("stDoc").selectedIndex;; 
	var ufDoc= document.getElementById("ufDoc").value; 
    var cdUsu= 1; 	

   
   

   //MONTAR O JASSON
	var myObj = {};
	var obj = []
    myObj.obj = obj;

	var  dados = {
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
	var msgServer ;
	var xmlhttp = new XMLHttpRequest(); //xhr
    var url = "http://177.72.161.135:9180/soa/esb/cupom/glbMedicos"
	var params =JSON.stringify(myObj);    
	xmlhttp.timeout = 10000;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
             msgServer =this.responseText;
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
                        sstatus = "401 - Acesso negado"
                        break;

                    case 500:
                        sstatus = "500 - Servidor fora do ar"
                        break;
					 case 599:
                        sstatus = "599 - Erro ao cadastrar "+msgServer;
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
	
    xmlhttp.open("POST",url,true); //ABRIR A CONEXAO COM O 
	xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(params);  //PASSAR O JASOM PARA O SERVIDOR
}




var TableManageCombine = function () {
	"use strict";
    return {
        //main function
        init: function () {
            handleDataTableCombinationSetting();
        }
    };
}();
    