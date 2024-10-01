const twitch = window.Twitch.ext;

$(function() {
    $('#form').submit(function(e) {
      e.preventDefault();
      options = []
      
      aname = $("input[name='aname']",this).val();
      options.push(aname)
      cname = $("input[name='cname']",this).val();
      options.push(cname)

      ssf = $("#fellowship").is(":checked");
      options.push(ssf)

      hc = $("#hardcore").is(":checked");
      options.push(hc)

      updateConfig();
    });
  });

  function updateConfig() {
    console.log(JSON.stringify(options))
    twitch.configuration.set('broadcaster', '1', JSON.stringify(options));
    console.log(twitch.configuration.broadcaster)
    $('#confirmation').show();
  }