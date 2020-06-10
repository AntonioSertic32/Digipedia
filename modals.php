<?php
//ini_set('memory_limit', '2048M');
//header('Content-type: text/json;');
header('Content-type: charset=ISO-8859-1');
include "connection.php";

$sModalID = $_GET['modal_id'];

switch($sModalID)
{
    
  case 'Dodaj_podclanak':
    echo 
        '<div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Dodaj kategoriju</h4>
        </div>
        <div class="modal-body">
            <form action="/action_page.php">
                <div class="form-group">
                    <label>Naslov podčlanka:</label>
                    <input type="text" placeholder="Naslov" required class="form-control">
                    <label>Sadržaj podčlanka:</label>
                    <input type="text" placeholder="..." required class="form-control" style="height:150px;">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button class="btn btn-default" type="button" >Spremi</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>';
        break;
    case 'Obrisi_clanak':
    echo 
        '<div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Obriši podčlanak</h4>
        </div>
        <div class="modal-footer">
            <button class="btn btn-default" type="button" >Obriši</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>';
    break;
    case 'Uredi_clanak':
    echo 
        '<div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Uredi članak</h4>
        </div>
        <div class="modal-body">
            <form action="/action_page.php">
                <div class="form-group">
                    <label>Naslov članka:</label>
                    <input type="text" placeholder="Naslov" required class="form-control">
                    <label>Sadržaj članka:</label>
                    <input type="text" placeholder="..." required class="form-control" style="height:150px;">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button class="btn btn-default" type="button" >Spremi</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>';
        break;
        case 'Dodaj_clanak':
        echo 
            '<div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Uredi članak</h4>
            </div>
            <div class="modal-body">
                <form action="/action_page.php">
                    <div class="form-group">
                        <label>Naslov članka:</label>
                        <input type="text" placeholder="Naslov" required class="form-control">
                        <label>Sadržaj članka:</label>
                        <input type="text" placeholder="..." required class="form-control" style="height:150px;">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" type="button" >Spremi</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>';
            break;
  default:
  echo 'greska';
}

?>