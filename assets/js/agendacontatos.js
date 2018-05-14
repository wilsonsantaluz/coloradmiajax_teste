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
				limparModal();
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
					
					//VALIDAR SE TEM ESTES CAMPOS NO JASSON POIS A CONSULTA PODE RETORNAR SEM ELES
	
					
					if ( typeof myObj[0].endereco !== "undefined")
					  document.getElementById("endereco").value = myObj[0].endereco; 
					
					if ( typeof myObj[0].bairro !== "undefined")
					  document.getElementById("bairro").value = myObj[0].bairro;
					  
			        if ( typeof myObj[0].telefone !== "undefined")
					  document.getElementById("telefone").value = myObj[0].telefone; 
				    
					if (typeof myObj[0].fax !== "undefined")
					  document.getElementById("fax").value = myObj[0].fax;	
                    
                    if ( typeof myObj[0].email !== "undefined")
					  document.getElementById("email").value = myObj[0].email; 				  
				  
				  
					
					if ( typeof myObj[0].dtNasc !== "undefined")
					  document.getElementById("dt_nasc").value = formatDate(myObj[0].dtNasc);
					  
			        if ( typeof myObj[0].dtFormatura !== "undefined")
					  document.getElementById("dt_formatura").value =formatDate( myObj[0].dtFormatura); 
				    
					if ( typeof myObj[0].cpf !== "undefined")
					  document.getElementById("cpf").value = myObj[0].cpf;	   
					
				    if ( typeof myObj[0].rg !== "undefined")
					  document.getElementById("rg").value = myObj[0].rg;		  
					
					if ( typeof myObj[0].cdInstituicao !== "undefined")
					  document.getElementById("cd_instituicao").value = myObj[0].cdInstituicao;
                    
					if ( typeof myObj[0].pontoRef !== "undefined")
					  document.getElementById("ponto_ref").value = myObj[0].pontoRef;
				  
				  	if ( typeof myObj[0].complemento !== "undefined")
					  document.getElementById("complemento").value = myObj[0].complemento;
				  
				  	if ( typeof myObj[0].nrEnd !== "undefined")
					  document.getElementById("nr_end").value = myObj[0].nrEnd;
				  
				  	if ( typeof myObj[0].cdCidLogra !== "undefined")
					  document.getElementById("cd_cid_logra").value = myObj[0].cdCidLogra;
				  
				  	if ( typeof myObj[0].dtCad !== "undefined")
					  document.getElementById("dt_cad").value = formatDate(myObj[0].dtCad); 
					
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

function atualizarMedicoServer() { 
    //CARREGAR AS VARIAVEIS DIGITADAS
    var cdCtr = document.getElementById("cdCtr").value;
    var cdEmp = 1;
    var nmMedico = document.getElementById("nmMedico").value;
    var cdEspecialidade = document.getElementById("cdEspecialidade").selectedIndex;
    var cdTpDoc = document.getElementById("cdTpDoc").selectedIndex;
    var cep = document.getElementById("cep").value;
    var nrDoc = document.getElementById("nrDoc").value;
    var cdCid = document.getElementById("cdCid").value;
    var stDoc = document.getElementById("stDoc").selectedIndex;
    var ufDoc = document.getElementById("ufDoc").value;
    var cdUsu = 1;	
	var endereco = document.getElementById("endereco").value ; 
	var bairro   = document.getElementById("bairro").value ;
	var	telefone = document.getElementById("telefone").value ; 
	var fax      = document.getElementById("fax").value;	
    var email    = document.getElementById("email").value; 
	var	dtNasc  =formatDateSql( document.getElementById("dt_nasc").value);
	var	dtFormatura = formatDateSql(document.getElementById("dt_formatura").value); 
	var cpf      = document.getElementById("cpf").value;	   
	var	rg       = document.getElementById("rg").value ;		  
	var cdInstituicao = document.getElementById("cd_instituicao").value ;
    var pontoRef = document.getElementById("ponto_ref").value;
	var complemento = document.getElementById("complemento").value;
	var nrEnd      = document.getElementById("nr_end").value;
	var cdCidLogra = document.getElementById("cd_cid_logra").value;
    var dtCad = formatDateSql(document.getElementById("dt_cad").value);
	
	
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
        "cdUsu=": cdUsu,		
		"endereco": endereco,
		"bairro": bairro,
		"telefone": telefone,
		"fax": fax,
		"email": email,
		"dtNasc":dtNasc,
		"dtFormatura": dtFormatura,
		"cpf": cpf,
		"rg": rg,
		"cdInstituicao": cdInstituicao,		
		"pontoRef": pontoRef,
		"complemento":complemento,
		"nrEnd":nrEnd,
		"dtCad":dtCad,
		"cdCidLogra": cdCidLogra

    }
   
    var msgServer;
    var xmlhttp = new XMLHttpRequest(); //xhr
    var url = "http://177.72.161.135:9180/soa/esb/cupom/glbMedicos"
    var params = JSON.stringify(dados);
    xmlhttp.timeout = 10000;
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            msgServer = this.responseText;
            if (this.status == 200) {
                myObj = null;
              
                if (this.responseText == "1") {
                    
                    swal({ 
                        
						type: 'success',
                        title: 'SUCESSO',
                        text: 'DADOS FORAM ATUALIZADOS',
                    });

                } else {

                    swal({ 
                        type: 'error',
                        title: 'ERROR',
                        text: 'OS DADOS NÃO FORAM ALTERADOS',
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
	//VERIFICAR SE ESTA INSERINDO OU EDITANDO
	//SE INSERINDO O CODIGO E VAZIO
    if (cdCtr ==''){
      xmlhttp.open("POST", url, true); //ABRIR A CONEXAO COM O 
	}else
    {
	  xmlhttp.open("PUT", url, true); //ABRIR A CONEXAO COM O 	
    }   		
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(params); //PASSAR O JASOM PARA O SERVIDOR
}

function  ExcluirMedicoServer(codigo) { //função para postar o codigo de barras
    
    //MONTAR O JASSON
   
    

    var dados = {
        "cdEmp": 1,
		"cdCtr": codigo

    }
  
    var msgServer;
    var xmlhttp = new XMLHttpRequest(); //xhr
    var url = "http://177.72.161.135:9180/soa/esb/cupom/glbMedicos"
    var params = JSON.stringify(dados);
    xmlhttp.timeout = 10000;
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            msgServer = this.responseText;
            if (this.status == 200) {
                myObj = null;
                myObj = JSON.parse(this.responseText);
               if (this.responseText == "1") {
                   
                    swal({                         
						type: 'success',
                        title: 'SUCESSO',                        
						text: 'O MEDICO FOI EXLUIDO !',
                    });

                } else {

                    swal({ //verificar se os dados não foram encontrados, depois de ter inserido
                        type: 'error',
                        title: 'ERRO',
						text: 'EXLCUSÃO NÃO REALIZADA !',
                       
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

    xmlhttp.open("DELETE", url, true); //ABRIR A CONEXAO COM O 
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
                    
                    swal({ 
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
        
		
		//CONVERTE O VALOR NUMERICO PARA UM NOME DE ESPECIALIDADE
		var especialidade ='';
		
		switch (myObj[i].cdEspecialidade) {
			
			case 0:
			  especialidade ='Esteticista';
			  break
			case 1:
			  especialidade ='Medico';
			 break
			case 2:
			  especialidade ='Nutricionista';
			 break
            case 3:
			  especialidade ='Odontologia';
			 break			 

		   case 4:
			  especialidade ='Veterinario';
			 break			  
			  
		
		}
		var idata = [

            myObj[i].cdCtr,
            myObj[i].nmMedico,
            especialidade,
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
           
        });
    }
}
function cadastrarnovo() {
    $("#modalconsulta").modal();
	limparModal();
    
}
function editarmedico(codigo) {
    //CHAMA A PESQUISA
	GetMedicosCodigo(codigo);
	//EXIBE O MODAL COM OS DADOS
    $("#modalconsulta").modal();
}
function excluirmedico(codigo)
{
   ExcluirMedicoServer(codigo);	
	
}

function pesquisarporInicial(evt,letra) {
   
    tabcontent = document.getElementById("tabinicial");
    tabcontent.style.display = "none";
   
    tablinks = document.getElementById("tablinks");
	document.getElementById('tabconsulta').style.display = "block";
    
    document.getElementById('ptitulotab').innerText ="Medicos iniciando com "+letra;
    evt.currentTarget.className += " active";
	GetMedicos(letra)
}
function pesquisarNomeMedico(){
    
	var str =document.getElementById('txtmedico').value;
	GetMedicos( str) ;
	
	tabcontent = document.getElementById("tabinicial");
    tabcontent.style.display = "none";
   
    tablinks = document.getElementById("tablinks");
	document.getElementById('tabconsulta').style.display = "block";
    
    document.getElementById('ptitulotab').innerText ="Localizando medicos [  "+str+" ]";
    evt.currentTarget.className += " active";
	
	
}	

function atualizarMedico(){
	
	atualizarMedicoServer()
}	
function formatDateSql(stringDate){
    var dateString = stringDate;
	var currentTime = new Date(parseInt(dateString));
	var month = ("0" + (currentTime.getMonth() + 1));
	var day = ("0" + currentTime.getDate());
	var year = currentTime.getFullYear();
	var date = year + '-' + month + '-' + day;
	return (date);
}
function formatDate(stringDate){
    var date=new Date(stringDate);
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear();
}
function limparModal(){
	var d = new Date();
    document.getElementById("cdCtr").value = '';
	document.getElementById("nmMedico").value = '';
	document.getElementById("cdEspecialidade").selectedIndex =0;
	document.getElementById("cdTpDoc").selectedIndex = 0; 
	document.getElementById("cep").value = '';
	document.getElementById("nrDoc").value = ''; 
    document.getElementById("dt_cad").value = ''; 	
	document.getElementById("cdCid").value = '';					
	document.getElementById("stDoc").selectedIndex =0;
	document.getElementById("ufDoc").selectedIndex =0;
	document.getElementById("endereco").value = '';
	document.getElementById("bairro").value = '';
	document.getElementById("telefone").value = '';
	document.getElementById("fax").value = '';
	document.getElementById("email").value = '';
	document.getElementById("dt_nasc").value = '';
	document.getElementById("dt_formatura").value = '';
	document.getElementById("cpf").value = '';
	document.getElementById("rg").value = '';
	document.getElementById("cd_instituicao").value = 1;
	document.getElementById("ponto_ref").value = '';
	document.getElementById("complemento").value = '';
	document.getElementById("nr_end").value = '';
	document.getElementById("cd_cid_logra").value = '1';
	
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
            autoFill: false,
            colReorder: false,
            //keys: true,
            rowReorder:false,
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
                    "defaultContent": "<button id="+'bteditar'+" class="+ '"btn btn-success"' +">Editar </button>",

                },
                {
                    "targets": -1,
                    "data": null,
                    "defaultContent": "<button id="+'btexcluir'+" class="+ '"btn btn-danger"' +">Excluir</button>"
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

        $('#data-table tbody').on('click', '#bteditar', function() {
            var data = tabelamedicos.row($(this).parents('tr')).data();
            editarmedico(data[0]);


        });
		$('#data-table tbody').on('click', '#btexcluir', function() {
            var data = tabelamedicos.row($(this).parents('tr')).data();
            excluirmedico(data[0]);


        });
    }
	
	//ATIVAR OS DATEPIPER PARA APARECER A DATA FORMATADA
	 $('#dt_cad').datepicker({
        todayHighlight: true,
        autoclose: true
	 });
	 $('#dt_formatura').datepicker({
        todayHighlight: true,
        autoclose: true
	 });
     $('#dt_nasc').datepicker({
        todayHighlight: true,
        autoclose: true
	 });

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