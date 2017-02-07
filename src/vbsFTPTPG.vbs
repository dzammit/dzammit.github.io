Option Explicit : Dim FTPaddr, UserName, Password, arASCII, ShowSuccess, RelPath

'vbsFTP.vbs - FTP upload tool using DOS FTP (DOS window suppressed).
'© Bill James - bill@billsway.com - rev 20 Oct 2000

'Requirements:
'  Windows Script Host 2.0 or higher.
'  FTP.exe in the local path (should already be present).
'  Local folder structure must match the directory structure of your web site.

'Implementation:
'  1) Edit the User Variables section below for your specific criteria.
'  2) Place a shortcut to this script in the SendTo folder.

'Usage:
'  Right click a file or files in your local web directory, click SendTo,
'  then select the vbsFTP shortcut.  Optional: Drag-and-Drop to script.

 ' * * * * * * * * * * * * * * User  Variables * * * * * * * * * * * * * *
 ' FTP address for the root of your web site:
 '   Example: "ftp.myISP.com" (check ISP help page for details)          *
   FTPaddr  = "users.tpg.com.au"
   RelPath  = "/src"
 ' FTP username for your site:                                           *
   UserName = "dzam72"
 ' FTP password for your site:                                           *
   Password = "zam2010t"
 ' ---ADVANCED Setup Options---                                          *
 ' (If you don't know what ascii upload means, leave this alone!)
 ' Files to be uploaded in ASCII format:                                 *
   arASCII = Array("txt", "cgi", "pl", "htm", "html", "asp", "js", "vbs")
 ' Suppress Popup if upload succeeded (True or False, no quotes):        *
   ShowSuccess = True
 ' * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Dim Title, args, fso, f, ck, ws, InFile, ftp, OutFile
Dim arOutLines, IconType, MsgTimer, Sent, errFTP

Title      = "vbsFTP © Bill James"
Set args   = WScript.Arguments
Set fso    = CreateObject("Scripting.FileSystemObject")
Set ws     = CreateObject("WScript.Shell")
'InFile     = fso.GetSpecialFolder(2) & "\" & fso.GetTempName
InFile = "d:\infile.txt"
Set ftp    = fso.OpenTextFile(InFile, 2, True)
OutFile    = fso.GetSpecialFolder(2) & "\" & fso.GetTempName
arOutlines = Array()

SanityCheck() 'Check input parameters OK

WriteScript() 'Write the FTP script

'Upload the files
ws.Run "%comspec% /c ftp -i -s:" & InFile & " >" & OutFile, 0, True

GetResults() ' Results of transfer

' Report failure or success
BEEP()
If ShowSuccess Then
 ' ws.Popup Join(arOutLines, vbcrlf), MsgTimer, Title, IconType
Else
  If errFTP Then
    ws.Popup Join(arOutLines, vbcrlf), MsgTimer, Title, IconType
  End If
End If

Cleanup() 'Release objects and exit

'---------Subs----------

Sub SanityCheck()
  'Script can not run if called directly with no parameters
  If args.Count < 1 Then
    ws.Popup "Use Drag-and-Drop or SendTo only.", , Title, 48
    Cleanup()
  End If

  'Check if a folder was sent to script
  On Error Resume Next
  Err.Clear
  For f = 0 To args.Count -1
    Set ck = fso.GetFile(args(f))
    If Err Then
      ws.Popup "Folders can not be uploaded.", , Title, 48
      Cleanup()
    End If
  Next
  On Error GoTo 0
End Sub

Sub WriteScript()
  Dim i, Trans
  'Create variable to enable changing to the same Web directory
  With ftp
    .WriteLine "open " & FTPaddr
    .WriteLine UserName
    .WriteLine Password
    .WriteLine "bell"	
    If RelPath <> "" Then .WriteLine "cd " & chr(34) & RelPath & chr(34)
    For f = 0 To args.Count -1
      Sent = False
      'Determine if ascii or binary transmission to be used
      For Each i in arASCII
        If LCase(i) = LCase(fso.GetExtensionName(args(f))) Then
          If Trans <> "ascii" Then
            Trans = "ascii"
            .WriteLine Trans
          End If
          Sent = True
        End If
      Next
      If Not Sent Then
        If Trans <> "binary" Then
          Trans = "binary"
          .WriteLine Trans
        End If
      End If
      .WriteLine "put " & chr(34) & args(f) & chr(34)
    Next
    .WriteLine "close"
    .WriteLine "bye"
    .Close
  End With
End Sub

Sub GetResults()
  Dim i, OutPut, ThisLine
  errFTP = False
  IconType = 64
  MsgTimer = 10
  ReDim Preserve arOutLines(0)
  arOutLines(0) = Title & vbcrlf & vbcrlf & "ERROR DURING UPLOAD: " & vbcrlf
  i = 0
  Set OutPut = fso.OpenTextFile(OutFile, 1)
  Do While Not OutPut.AtEndOfStream
    ThisLine = OutPut.ReadLine
    'FTP error codes are 4xx or 5xx
    If CStr(Left(ThisLine, 1)) = CStr(4) Or CStr(Left(ThisLine, 1)) = CStr(5) Then
      i = i + 1
      ReDim Preserve arOutLines(i)
      arOutLines(i) = ThisLine
      errFTP = True
      IconType = 48 + 4096
      MsgTimer = 0
    End If
  Loop
  OutPut.Close
  If errFTP Then
    i = i + 1
    ReDim Preserve arOutLines(i)
    arOutLines(i) = "File(s) not uploaded:" & vbcrlf
  Else
    ReDim Preserve arOutLines(0)
    arOutLines(0) = Title & vbcrlf & vbcrlf & _
                    "File(s) uploaded successfully:" & vbcrlf
  End If
  For f = 0 To args.Count -1
    i = i + 1
    ReDim Preserve arOutLines(i)
    arOutLines(i) = args(f) & Space(15)
  Next
End Sub

Sub Cleanup()
  On Error Resume Next
'  fso.DeleteFile InFile, True
'  fso.DeleteFile OutFile, True
  Set args = Nothing
  Set fso  = Nothing
  Set ws   = Nothing
  Set ftp  = Nothing
  Erase arOutlines
  Erase arASCII
  WScript.Quit
End Sub

sub Beep()
	dim wshShell
	dim cBeep
	set wshShell = Wscript.CreateObject("wscript.Shell")
	cbeep = chr(007)
	WshShell.Run "cmd /c @echo " & cbeep, 0
end sub
