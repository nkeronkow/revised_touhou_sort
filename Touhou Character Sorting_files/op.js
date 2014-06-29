function OpenWnd() {
      var oWindow = window.open("", ""); 
      with (oWindow.document) {
            write("<html>");
            write("<head>");
            write("<title>Tohosort: Raw Text Results<\/title>");
            write("<\/head>");
            write("<body bgcolor=\"#ffffff\">");
            write(csort5);
            write("<hr>");
            write("<input type='button' value='Close' onclick='window.close()'>");
            write("<hr>");		
			write("<\/body>");
            write("<\/html>");
            close(); 
      }
}