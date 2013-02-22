<?php

$reply_email="thijsdaniels89@gmail.com";

if (!isset($_POST['email']))
{
 echo "<script language=\"JavaScript\"><!--\n ";
 echo "top.location.href = \"$valid_ref1\"; \n// --></script>";
 exit;
}

/*

function is_forbidden($str,$check_all_patterns = true)
{
 $patterns[0] = '/content-type:/';
 $patterns[1] = '/mime-version/';
 $patterns[2] = '/multipart/';
 $patterns[3] = '/Content-Transfer-Encoding/';
 $patterns[4] = '/to:/';
 $patterns[5] = '/cc:/';
 $patterns[6] = '/bcc:/';
 $forbidden = 0;
 for ($i=0; $i<count($patterns); $i++)
  {
   $forbidden = preg_match($patterns[$i], strtolower($str));
   if ($forbidden) break;
  }
 if ($check_all_patterns AND !$forbidden) $forbidden = preg_match("/(%0a|%0d|\\n+|\\r+)/i", $str);
 if ($forbidden)
 {
  echo '<center><table><tr><td align="center" style="font-family:Calibri; font-size:14px; letter-spacing:1px; line-height:24px; color:#000000">
                   <br><br><br><br><br>The message could not be sent due to the use of one of the following forbidden characters:<br><br><br>';
  foreach ($patterns as $key => $value) echo trim($value,"/")."\n";
  echo '<br><br>Please click back on your browser, remove the above characters and try again.';
  exit();
 }
}

foreach ($_REQUEST as $key => $value)
{
 if ($key == "mail") is_forbidden($value, false);
 else is_forbidden($value);
}

*/

$name = $_POST["name"];
$phone = $_POST["phone"];
$email = $_POST["email"];
$subject = $_POST["subject"];
$message = $_POST["message"];

if ($subject == "") $subject = "New Message";
else $subject = "New Message: " . $subject;

$success = '
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>QMaxims</title>
        <link rel="stylesheet" type="text/css" href="style.css"/>
	</head>
	<body class="body">
    	<div class="header">
        	<table class="wrapper">
            	<tr>
                	<td align="left" style="vertical-align:bottom">
                		<img src="../images/tag_white.png" height="120"/>
                    </td>
                    <td align="right">
                       	<img src="../images/logo_white.png" height="160"/>
                	</td>
                </tr>
            </table>
        </div>
        <div class="main" style="border-top:20px solid #0092BD">
        	<table class="wrapper">
            	<tr>
                	<td colspan="2">
                        <table class="table">
                            <tr>
                                <td class="tl"></td>
                                <td class="tm"></td>
                                <td class="tr"></td>
                            </tr>
                            <tr>
                                <td class="ml"></td>
                                <td class="mm">
                                	<font class="title">Message Sent</font><br/>
                                    <br/>
                                    Your message has been sent and I will reply to it as soon as I can. Thank you for your interest in QMAXIMS. Click OK to return to the home page.<br/>
                                    <br/>
                                    <center>
                                    	<a href="../index.html"><img src="../images/ok_out.png" onmouseover="this.src=\'../images/ok_in.png\'" onmouseout="this.src=\'../images/ok_out.png\'"/></a>
                                    </center>
                                </td>
                                <td class="mr"></td>
                            </tr>
                            <tr>
                                <td class="bl"></td>
                                <td class="bm"></td>
                                <td class="br"></td>
                            </tr>
                        </table>
                	</td>
                </tr>
            </table>
        </div>
        <div class="footer">
        	<table class="wrapper">
            	<tr>
                	<td>
            			Copyright 2012 <a href="http://www.danielsdesign.nl">Daniels Design</a>, All Rights Reserved.
            		</td>
                </tr>
            </table>
        </div>
        <div class="preload">
        	<img src="../images/ok_in.png"/>
        </div>
	</body>
</html>
';

$mail = "
This message arrived through the contact form:

$message

Kind regards,
$name
$phone
";

mail("$reply_email", "$subject", "$mail", "From: $email\nReply-To: $email");

echo $success;

?>