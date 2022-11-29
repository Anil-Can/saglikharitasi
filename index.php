<?php
    function console_log( $data ){
        echo '<script>';
        echo 'console.log('. json_encode( $data ) .')';
        echo '</script>';
    }
    $type = "";
    $conn = mysqli_connect('localhost','root','','bap');
    if(isset($_POST['category2'])) // Çapraz Sorgu yapıldıysa
    {
        // Normal sorgudan gelen kategori ve yıl sorgudan alınır
        $inputData = explode("-", $_POST['category']);
        $firstCategory = $inputData[0];
        $year = $inputData[1];

        $field = $firstCategory === 'saglik_personel' ? 'hekim':'toplam';
        $compute = $_POST['category2'] === 'olum' ? 'oran': 'value';
        // Tablo isimleri getirilidi
        $table1 = $firstCategory."_".$year;
        $table2 = $_POST['category2']."_".$year;
        $nufus = "nufus_".$year;

        // Where koşulu
        $number = floatval($_POST['interval']);

        $sql =  "SELECT {$nufus}.*,{$table2}.{$compute} AS compute FROM {$table2} INNER JOIN {$nufus} ON {$table2}.il = {$nufus}.il";
        $sql_filter = "SELECT {$table1}.il
        FROM {$table1} 
        INNER JOIN {$nufus} ON {$nufus}.il = {$table1}.il 
        WHERE {$nufus}.nufus/{$table1}.{$field} {$_POST['logic']}{$number};";
        $result = mysqli_query($conn,$sql);
        $properties = mysqli_fetch_all($result,MYSQLI_ASSOC);
        $result_filter = mysqli_query($conn,$sql_filter);
        $properties_filter = mysqli_fetch_all($result_filter,MYSQLI_ASSOC);
        function highlight($property)
        {
            global $properties_filter;
            $index = array_search($property['il'],array_column($properties_filter, 'il'));
            $property['highlight'] = $index ? true:false;
            return $property;
        }
        $properties = array_map('highlight',$properties);
        $data = json_encode($properties);
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