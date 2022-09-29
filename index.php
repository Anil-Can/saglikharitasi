<?php
    function console_log( $data ){
        echo '<script>';
        echo 'console.log('. json_encode( $data ) .')';
        echo '</script>';
    }
    $type = "";
    //session_start();
    $conn = mysqli_connect('localhost','root','','bap');
    if(isset($_POST['category2'])) // Çapraz Sorgu yapıldıysa
    {
        echo $_POST['category2'];
    }
    else
    {
        if(isset($_POST['years2'])) // Değişim analizi yapıldysa
        {

        }
        else // Nomral sorgu yapıldıysa
        {
            $table1 = null;
            $table2 = null;
            if(isset($_POST['category']))
            {
                $table1 = $_POST['category']."_".$_POST['years'];
                $table2 = "nufus_".$_POST['years'];
            }   
            else // Sayfa ilk defa açıldıysa
            {
                $table1 = "hastanesayisi_2002";
                $table2 = "nufus_2002";
            }
            $sql = "SELECT {$table1}.*, {$table2}.nufus FROM {$table1} INNER JOIN {$table2} ON {$table1}.il = {$table2}.il";
            $result = mysqli_query($conn,$sql);
            $properties = mysqli_fetch_all($result,MYSQLI_ASSOC);
            $data = json_encode($properties);
        }
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sağlık Araştırması</title>
</head>
<body>
    <div id="root"></div>
    <script>
        var queryResult = JSON.parse('<?= $data; ?>');
    </script>
    <script src="bundle.js"></script>
</body>
</html>