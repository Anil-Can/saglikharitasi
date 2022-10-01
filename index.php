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
            $firstCategory = $_POST['category']."_".$_POST['years'];
            $firstYear= "nufus_".$_POST['years'];

            $secondCategory = $_POST['category']."_".$_POST['years2'];
            $secondYear= "nufus_".$_POST['years2'];

            $sql1 =  "SELECT {$firstCategory}.*, {$firstYear}.nufus FROM {$firstCategory} INNER JOIN {$firstYear} ON {$firstCategory}.il = {$firstYear}.il";
            $sql2 =  "SELECT {$secondCategory}.*, {$secondYear}.nufus FROM {$secondCategory} INNER JOIN {$secondYear} ON {$secondCategory}.il = {$secondYear}.il";

            $result1 = mysqli_query($conn,$sql1);
            $properties1 = mysqli_fetch_all($result1,MYSQLI_ASSOC);

            $result2 = mysqli_query($conn,$sql2);
            $properties2 = mysqli_fetch_all($result2,MYSQLI_ASSOC);
            global $asd;
            $keys = array_keys($properties1[0]);
            array_shift($keys);
            function combine($first,$second)
            {
                global $keys;
                $newArray = array();
                $newArray['il'] = $first['il'];

                $year1 = $_POST['years'];
                $year2 = $_POST['years2'];
                foreach($keys as $key)
                {
                    $newArray["{$key}_{$year1}"] = $first["{$key}"];
                    $newArray["{$key}_{$year2}"] = $second["{$key}"];          
                }
                
                return $newArray;
            }
            $properties = array_map('combine',$properties1,$properties2);
            $data = json_encode($properties);
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