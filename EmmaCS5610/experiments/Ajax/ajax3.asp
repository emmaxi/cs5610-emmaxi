<%
response.expires=-1
dim a(15)
'Fill up array with computer science techonolgy
a(1)="Java"
a(2)="Windows"
a(3)="Asp"
a(4)="Jsp"
a(5)="C"
a(6)="C++"
a(7)="C#"
a(8)="Python"
a(9)="Linux"
a(10)="PHP"
a(11)="JavaScript"
a(12)="AngularJS"
a(13)="jQuery"
a(14)="Ruby"
a(15)="SQL"

'get the q parameter from URL
q=ucase(request.querystring("q"))

'lookup all hints from array if length of q>0
if len(q)>0 then
  hint=""
  for i=1 to 30
    if q=ucase(mid(a(i),1,len(q))) then
      if hint="" then
        hint=a(i)
      else
        hint=hint & " , " & a(i)
      end if
    end if
  next
end if

'Output "no suggestion" if no hint were found
'or output the correct values
if hint="" then
  response.write("no suggestion")
else
  response.write(hint)
end if
%>