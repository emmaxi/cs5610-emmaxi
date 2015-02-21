<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System.Collections" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <script runat="server">
        protected void Page_Load(object sender, EventArgs e)
        {   
            string Google = "{name:'Google',"
                          + "introduction: 'Google Inc. is an American multinational corporation specializing in Internet-related services and products. These include search, cloud computing, software, and online advertising technologies.',"
                          + "founder: 'Larry Page, Sergey Brin',"
                          + "revenue: 'US$ 50.18 billion',"
                          + "place: 'Googleplex, Mountain View, California, U.S.'}";

            string LinkedIn = "{name:'LinkedIn',"
                            + "introduction: 'LinkedIn is a social networking website for people in professional occupations. Founded in December 2002 and launched on May 5, 2003, it is mainly used for professional networking.',"
                            + "founder: 'Reid Hoffman, Allen Blue',"
                            + "revenue: 'US$ 972 million',"
                            + "place: 'Mountain View, California, U.S.'}";

            string Facebook = "{name:'Facebook',"
                            + "introduction: 'Facebook is an online social networking service. Its name comes from a colloquialism for the directory given to American university students.',"
                            + "founder: 'Mark Zuckerberg, Mark Zuckerberg',"
                            + "revenue: 'US$ 5.1 billion',"
                            + "place: 'Menlo Park, California, U.S.'}";

            Hashtable set = new Hashtable();
            set.Add("Google", Google);
            set.Add("LinkedIn", LinkedIn);
            set.Add("Facebook", Facebook);
            Response.Clear();
            Response.Write(set[Request["company"]]);
            Response.End();
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
</body>
</html>