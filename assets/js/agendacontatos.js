/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7
Version: 2.1.0
Author: paulo cezar luz
*/
var tabelamedicos;
var dadosconsulta = [];
var glbevt = {};
var glbletra = '';
//----------------------------------------------------------------------------------------------
//FUNCÕES DE CONSULTAS--------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
function GetMedicosCodigo(codigo) { //função para carregar os dados medico usando xhr

  //nessa função não precisa de validar limite de caracteres

  var xhr = new XMLHttpRequest(); //xhr
  xhr.timeout = 10000;
  xhr.onreadystatechange = function () {
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

          //VALIDAR SE TEM ESTES CAMPOS NO json POIS A CONSULTA PODE RETORNAR SEM ELES

          if (typeof myObj[0].endereco !== "undefined")
            document.getElementById("endereco").value = myObj[0].endereco;

          if (typeof myObj[0].bairro !== "undefined")
            document.getElementById("bairro").value = myObj[0].bairro;

          if (typeof myObj[0].telefone !== "undefined")
            document.getElementById("telefone").value = myObj[0].telefone;

          if (typeof myObj[0].fax !== "undefined")
            document.getElementById("fax").value = myObj[0].fax;

          if (typeof myObj[0].email !== "undefined")
            document.getElementById("email").value = myObj[0].email;

          if (typeof myObj[0].dtNasc !== "undefined")
            document.getElementById("dt_nasc").value = formatDate(myObj[0].dtNasc);

          if (typeof myObj[0].dtFormatura !== "undefined")
            document.getElementById("dt_formatura").value = formatDate(myObj[0].dtFormatura);

          if (typeof myObj[0].cpf !== "undefined")
            document.getElementById("cpf").value = myObj[0].cpf;

          if (typeof myObj[0].rg !== "undefined")
            document.getElementById("rg").value = myObj[0].rg;

          if (typeof myObj[0].cdInstituicao !== "undefined")
            document.getElementById("cd_instituicao").value = myObj[0].cdInstituicao;

          if (typeof myObj[0].pontoRef !== "undefined")
            document.getElementById("ponto_ref").value = myObj[0].pontoRef;

          if (typeof myObj[0].complemento !== "undefined")
            document.getElementById("complemento").value = myObj[0].complemento;

          if (typeof myObj[0].nrEnd !== "undefined")
            document.getElementById("nr_end").value = myObj[0].nrEnd;

          if (typeof myObj[0].cdCidLogra !== "undefined")
            document.getElementById("cd_cid_logra").value = myObj[0].cdCidLogra;

          if (typeof myObj[0].dtCad !== "undefined")
            document.getElementById("dt_cad").value = formatDate(myObj[0].dtCad);

        }

      } else {
        var sstatus = this.status + ' - Erro não tratado'; //verificando se o servidor está offline
        switch (this.status) {
          case 0:
            sstatus = "Erro na conexão";
            break;
          case 404:
            sstatus = "404 - A URL informada não e válida ou servidor fora do ar";
            break;
          case 401:
            sstatus = "401 - Acesso negado";
            break;
          case 500:
            sstatus = "500 - Erro interno provalvemente parâmetro de consulta não informado";
            break;
          case 599:
            sstatus = "599 -" + msgServer;
            break;
        }
        if (this.status = 0) sstatus = "Timeout de conexão"
        beep();
        swal({
          type: 'error',
          title: 'ERRO',
          text: 'Erro: ' + sstatus,
        });
      }
    }
  };
  xhr.open("GET", 'http://177.72.161.135:9180/soa/esb/cupom/glbMedicos?obj={"cdCtr":' + codigo + '}', true);
  xhr.send();
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
  var endereco = document.getElementById("endereco").value;
  var bairro = document.getElementById("bairro").value;
  var telefone = document.getElementById("telefone").value;
  var fax = document.getElementById("fax").value;
  var email = document.getElementById("email").value;
  var dtNasc = toDate(document.getElementById("dt_nasc").value);
  var dtFormatura = toDate(document.getElementById("dt_formatura").value);
  var cpf = document.getElementById("cpf").value;
  var rg = document.getElementById("rg").value;
  var cdInstituicao = document.getElementById("cd_instituicao").value;
  var pontoRef = document.getElementById("ponto_ref").value;
  var complemento = document.getElementById("complemento").value;
  var nrEnd = document.getElementById("nr_end").value;
  var cdCidLogra = document.getElementById("cd_cid_logra").value;
  var dtCad = toDate(document.getElementById("dt_cad").value);
  var params = "obj=" + JSON.stringify(dados);

  /*if (nmMedico == "") {
    swal({
      type: 'error',
      title: 'ERRO',
      text: 'DIGITE O NOME DO MÉDICO'
    });
  }

  if (cdCid == "") {
    swal({
      type: 'error',
      title: 'ERRO',
      text: 'DIGITE O CÓDIGO DA CIDADE'
    });
  }

  if (dtCad == "") {
    swal({
      type: 'error',
      title: 'ERRO',
      text: 'DIGITE A DATA DO CADASTRO'
    });
  }

  if (dtFormatura == "") {
    swal({
      type: 'error',
      title: 'ERRO',
      text: 'DIGITE A DATA DA FORMATURA'
    });
  }

  if (dtCad == "") {
    swal({
      type: 'error',
      title: 'ERRO',
      text: 'DIGITE A DATA DO CADASTRO'
    });
  }

  if (rg == "") {
    swal({
      type: 'error',
      title: 'ERRO',
      text: 'DIGITE O RG'
    });
  }

  if (cpf == "") {
    swal({
      type: 'error',
      title: 'ERRO',
      text: 'DIGITE O CPF'
    });
  }

  if (cep == "") {
    swal({
      type: 'error',
      title: 'ERRO',
      text: 'DIGITE O CPF'
    });
  }

  var select = document.getElementById('cdEspecialidade');
  if (select.value != 0) {
    return true;
  } else {
    swal({
      type: 'error',
      title: 'ERRO',
      text: 'SELECIONE UMA ESPECIALIDADE'
    });
  }

  var select2 = document.getElementById('ufDoc');
  if (select2.value != 0) {
    return true;
  } else {
    swal({
      type: 'error',
      title: 'ERRO',
      text: 'SELECIONE UMA UF'
    });
  }

  var select3 = document.getElementById('stDoc');
  if (select2.value != 0) {
    return true;
  } else {
    swal({
      type: 'error',
      title: 'ERRO',
      text: 'SELECIONE O DOCUMENTO ESTÁ ATIVO OU INATIVO'
    });
  }

  var select4 = document.getElementById('tpDoc');
  if (select4.value != 0) {
    return true;
  } else {
    swal({
      type: 'error',
      title: 'ERRO',
      text: 'SELECIONE O TIPO DE DOCUMENTO'
    });
  }*/


  //MONTAR O json
  var myObj = {};
  var obj = [];
  myObj.obj = obj;
  var urlEncodedDataPairs = [];

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
    "cdUsu": cdUsu,
    "endereco": endereco,
    "bairro": bairro,
    "telefone": telefone,
    "fax": fax,
    "email": email,
    "dtNasc": dtNasc,
    "dtFormatura": dtFormatura,
    "cpf": cpf,
    "rg": rg,
    "cdInstituicao": cdInstituicao,
    "pontoRef": pontoRef,
    "complemento": complemento,
    "nrEnd": nrEnd,
    "dtCad": dtCad,
    "cdCidLogra": cdCidLogra

  };
  //SE ESTIVER INSERINDO
  if (cdCtr == '0') {
    obj.push(dados);
    params = "obj=" + JSON.stringify(dados);
  } else {
    params = JSON.stringify(dados);
  }
  var msgServer;
  var xhr = new XMLHttpRequest(); //xhr
  var url = "http://177.72.161.135:9180/soa/esb/cupom/glbMedicos";

  xhr.onreadystatechange = function () {
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
          beep();
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
            sstatus = "Timeout de conexão";
            break;
          case 404:
            sstatus = "404 - A url informada não é válida ou servidor fora do ar";
            break;
          case 401:
            sstatus = "401 - " + msgServer;
            break;
          case 500:
            sstatus = "500 - " + msgServer;
            break;
          case 599:
            sstatus = "599 - " + msgServer;
            break;
        }

        if (this.status = 0) sstatus = "Timeout de conexão"
        beep();
        swal({
          type: 'error',
          title: 'ERRO',
          text: 'Erro: ' + sstatus
        });
      }
    };
  };
  //VERIFICAR SE ESTA INSERINDO OU EDITANDO
  //SE INSERINDO O CODIGO E VAZIO
  if (cdCtr == '0') {
    xhr.open("POST", url, true); //ABRIR A CONEXAO COM O
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  } else {
   xhr.open("PUT", url, true); //ABRIR A CONEXAO COM O
  }
   xhr.send(params); //PASSAR O JASOM PARA O SERVIDOR
  }

function ExcluirMedicoServer(codigo) {
  var dados = {
    "cdEmp": 1,
    "cdCtr": codigo
  };
  var msgServer;
  var xhr = new XMLHttpRequest(); //xhr
  var url = "http://177.72.161.135:9180/soa/esb/cupom/glbMedicos";
  var params = JSON.stringify(dados);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      msgServer = this.responseText;
      if (this.status == 200) {
        myObj = null;
        myObj = JSON.parse(this.responseText);
        if (this.responseText == "1") {

          swal({
            type: 'success',
            title: 'SUCESSO',
            text: 'OS DADOS FORAM EXCLUÍDOS!',
          });

        } else {

          swal({ //verificar se os dados não foram encontrados, depois de ter inserido
            type: 'error',
            title: 'ERRO',
            text: 'OS DADOS NÃO FORAM EXCLUÍDOS!',
          });

        }
      } else {
        var sstatus = this.status + 'Erro desconhecido'; //verificando se o servidor está offline
        switch (this.status) {
          case 0:
            sstatus = "Timeout de conexão";
            break;
          case 404:
            sstatus = "404 - A url informada não é válida ou servidor fora do ar";
            break;
          case 401:
            sstatus = "401 - " + msgServer;
            break;
          case 500:
            sstatus = "500 - " + msgServer;
            break;
          case 599:
            sstatus = "599 - Erro ao excluir cadastro, pois o cadastro está sendo utilizado em outra tabela."
            break;
        }


        if (this.status = 0) sstatus = "Timeout de conexão"
        beep();
        swal({
          type: 'error',
          title: 'ERRO',
          text: 'Erro: ' + sstatus,
        });
      }
    }
  };

  xhr.open("DELETE", url, true); //ABRIR A CONEXAO COM O
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(params); //PASSAR O json PARA O SERVIDOR
}


function GetMedicos(nmMedico) { //função para carregar os dados medico usando xhr
  var txtMedico = document.getElementById("txtmedico").value;
  var xhr = new XMLHttpRequest(); //xhr
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        myObj = null;
        myObj = JSON.parse(this.responseText);
        if (typeof myObj[0] == "undefined") {
          beep();
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
            sstatus = "Erro na conexão";
            break;
          case 404:
            sstatus = "404 - A URL informada não e válida ou servidor fora do ar";
            break;
          case 401:
            sstatus = "401 - Acesso negado";
            break;
          case 500:
            sstatus = "500 - Erro interno provalvemente parâmetro de consulta não informado";
            break;
          case 599:
            sstatus = "599 -" + msgServer;
            break;
        }
        if (this.status = 0) sstatus = "Timeout de conexão"
        beep();
        swal({
          type: 'error',
          title: 'ERRO',
          text: 'Erro: ' + sstatus,
        });
      }
    }
  };

  xhr.open("GET", 'http://177.72.161.135:9180/soa/esb/cupom/glbMedicos?obj={"nmMedico":"' + nmMedico + '"}', true);
  xhr.send();
  //xhr get method
}

function getMedicosCdCtr(codigo) {
  var xhr = new XMLHttpRequest(); //xhr
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        myObj = null;
        myObj = JSON.parse(this.responseText);
        if (typeof myObj[0] == "undefined") {
          beep();
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
            sstatus = "Erro na conexão";
            break;
          case 404:
            sstatus = "404 - A URL informada não e válida ou servidor fora do ar";
            break;
          case 401:
            sstatus = "401 - Acesso negado";
            break;
          case 500:
            sstatus = "500 - Erro interno provalvemente parâmetro de consulta não informado";
            break;
          case 599:
            sstatus = "599 -" + msgServer;
            break;
        }
        if (this.status = 0) sstatus = "Timeout de conexão"
        beep();
        swal({
          type: 'error',
          title: 'ERRO',
          text: 'Erro: ' + sstatus,
        });
      }
    }
  };

  xhr.open("GET", 'http://177.72.161.135:9180/soa/esb/cupom/glbMedicos?obj={"cdCtr":"' + codigo + '"}', true);
  xhr.send();
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
    var especialidade = '';

    switch (myObj[i].cdEspecialidade) {
      case 1:
        especialidade = 'Esteticista';
        break;
      case 2:
        especialidade = 'Medico';
        break;
      case 3:
        especialidade = 'Nutricionista';
        break;
      case 4:
        especialidade = 'Dentista';
        break;
      case 5:
        especialidade = 'Veterinario';
        break;

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
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
    beep();
    swal({
      type: 'error',
      title: 'ERRO',
      text: 'SOMENTE CÓDIGOS'
    });
  }
}

function validarnomes(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  var regex = /^[A-Za-z\s]+$/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
    beep();
    swal({
      type: 'error',
      title: 'ERRO',
      text: 'SOMENTE NOMES'
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

function excluirmedico(codigo) {
  ExcluirMedicoServer(codigo);
  pesquisarporInicial(glbevt, glbletra);
}

function pesquisarporInicial(event, letra) {
  GetMedicos(letra);
  glbevt = event;
  glbletra = letra;

  tabcontent = document.getElementById("tabinicial");
  tabcontent.style.display = "none";

  tablinks = document.getElementById("tablinks");
  document.getElementById('tabconsulta').style.display = "block";

  document.getElementById('ptitulotab').innerText = "Medicos iniciando com " + letra;
  if (event) {
    event += "active";
  }
  // HTML events are "things" that happen to HTML elements.
  // When JavaScript is used in HTML pages, JavaScript can "react" on these events.
}

function pesquisarNomeMedico(event) {
  var str = document.getElementById("txtmedico").value;
  if (str < 1) {
    swal({
      type: 'error',
      title: 'ERRO',
      text: 'DIGITE UM NOME'
    });
    return false;
  } else {
    GetMedicos(str);
    tabcontent = document.getElementById("tabinicial");
    tabcontent.style.display = "none";

    tablinks = document.getElementById("tablinks");
    document.getElementById('tabconsulta').style.display = "block";

    document.getElementById('ptitulotab').innerText = "Localizando medicos:" + " " + str;
    event += "active";
  }
}

function pesquisarCodigoMedico(event) {
  var int = document.getElementById('txtcdctr').value;
  if (int < 1) {
    swal({
      type: 'error',
      title: 'ERRO',
      text: 'DIGITE UM CÓDIGO'
    });
    return false;
  } else {
    getMedicosCdCtr(int);
    tabcontent = document.getElementById("tabinicial");
    tabcontent.style.display = "none";

    tablinks = document.getElementById("tablinks");
    document.getElementById("tabconsulta").style.display = "block";

    document.getElementById("ptitulotab").innerText = "Localizando medicos:" + " " + int;
    event += "active";
  }
}


function atualizarMedico() {
  atualizarMedicoServer();
}

function limparModal() {
  document.getElementById("cdCtr").value = '0';
  document.getElementById("nmMedico").value = '';
  document.getElementById("cdEspecialidade").selectedIndex = 0;
  document.getElementById("cdTpDoc").selectedIndex = 0;
  document.getElementById("cep").value = '';
  document.getElementById("nrDoc").value = '';
  document.getElementById("dt_cad").value = '';
  document.getElementById("cdCid").value = '';
  document.getElementById("stDoc").selectedIndex = 0;
  document.getElementById("ufDoc").selectedIndex = 0;
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

var handleDataTableCombinationSetting = function () {
  "use strict";

  if ($('#data-table').length !== 0) {
    tabelamedicos = $('#data-table').DataTable({

      dom: 'lBfrtip',
      buttons: [{
          titleAttr: "Novo",
          className: "btn btn-success glyphicon glyphicon-save-file",
          text: "Novo",

          action: function (e, dt, node, config, pdata) {
            cadastrarnovo();
          }
        }

      ],
      responsive: true,
      autoFill: false,
      colReorder: false,
      //keys: true,
      rowReorder: false,
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
          "sTitle": "Editar"
        },
        {
          "sTitle": "Deletar"
        }

      ],
      "columnDefs": [{
          "targets": -2,
          "data": null,
          "defaultContent": "<button id=" + 'bteditar' + " class=" + '"btn btn-success"' + ">Editar </button>",

        },
        {
          "targets": -1,
          "data": null,
          "defaultContent": "<button id=" + 'btexcluir' + " class=" + '"btn btn-danger"' + ">Excluir</button>"
        }
      ],

      language: {
        "lengthMenu": "Mostrar  _MENU_  itens ",
        "zeroRecords": "Nada encontrado",
        "info": "Total: _MAX_ Registro(s) -  Pagina:  _PAGE_ /  _PAGES_ ",
        "infoEmpty": "Sem dados",
        "loadingRecords": "Carregando...",
        "processing": "Carregando...",
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
      },
      processing: true

    });

    $('#data-table tbody').on('click', '#bteditar', function () {
      var data = tabelamedicos.row($(this).parents('tr')).data();
      editarmedico(data[0]);
    });

    $('#data-table tbody').on('click', '#btexcluir', function () {
      var data = tabelamedicos.row($(this).parents('tr')).data();
      excluirmedico(data[0]);
    });
  }

  /*ATIVAR O DATEPICKER PARA APARECER A DATA FORMATADA
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
  });*/

};

TableManageCombine = function () {
  "use strict";
  return {
    //main function
    init: function () {
      handleDataTableCombinationSetting();
    }
  };
}();

function pad(str, length) {
  /*Coloca os zeros na esquerda, ou seja, arruma o formato data,
  pois o SQL entende dessa maneira*/
  const resto = length - String(str).length;
  return '0'.repeat(resto > 0 ? resto : '0') + str;
}

function formatDate(stringDate) {
  //Date Object ISO
  var date = new Date(stringDate);
  //Retornar ano atual + '-' + '0+(mês atual)' + 1 + '-' + '0+(dia atual)'
  /*o '2' é necessário para retornar o segundo número,
  e o '1' é necessário para retornar o primeiro número.*/
  return date.getFullYear() + '-' + pad((date.getMonth() + 1), 2) + '-' + pad(date.getDate(), 2);
}

function toDate(dateStr) {
  var d = new Date();
  /*retorna a posição do "/" na string dateStr, e o valor,
  retornado não deve ser igual a -1*/
  if (dateStr.indexOf("/") != -1) {
    /*const é um tipo de variável que não pode ser declarada
    ou modificada
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
    o método split divide a string em substrings
    https://www.w3schools.com/jsref/jsref_split.asp
    então retorna o ano em uma substring
    o mês em uma substring e o dia em uma substring*/
    const [day, month, year] = dateStr.split("/");
    /*Método para o date object retornar o ano atual,
    mês - 1 e o dia*/
    d = new Date(year, month - 1, day);
    /*Retornar a variável data no formato JSON*/
    return d.toJSON();
  } else {
    /*Caso não ocorra, retornar
       a posição do "/" na string dateStr*/
    if (dateStr.indexOf("-") != -1) {
      /*const é um tipo de variável que não pode ser declarada
      ou modificada
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
      o método split divide a string em substrings
      https://www.w3schools.com/jsref/jsref_split.asp
      então retorna o ano em uma substring
      o mês em uma substring e o dia em uma substring*/
      const [year, month, day] = dateStr.split("-");
      /*Método para o date object retornar o ano atual,
      mês - 1 e o dia*/
      d = new Date(year, month - 1, day);
      //Retorna a variável data no formato JSON
      return d.toJSON();
    }
  }
}

//if you have another AudioContext class use that one, as some browsers have a limit
var audioCtx = new(window.AudioContext || window.webkitAudioContext || window.audioContext);

//All arguments are optional:

//duration of the tone in milliseconds. Default is 500
//frequency of the tone in hertz. default is 440
//volume of the tone. Default is 1, off is 0.
//type of tone. Possible values are sine, square, sawtooth, triangle, and custom. Default is sine.
//callback to use on end of tone
function beep(duration, frequency, volume, type, callback) {
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  if (volume) {
    gainNode.gain.value = volume;
  }
  if (frequency) {
    oscillator.frequency.value = frequency;
  }
  if (type) {
    oscillator.type = type;
  }
  if (callback) {
    oscillator.onended = callback;
  }

  oscillator.start();
  setTimeout(function () {
    oscillator.stop();
  }, (duration ? duration : 500));
}