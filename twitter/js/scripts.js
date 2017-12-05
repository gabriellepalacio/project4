var html = ""
var apiurl = "https://api.flickr.com/services/feeds/photos_public.gne?tags=uncbasketball&tagmode=any&format=json&jsoncallback=?"
$( document ).ready(function($){
  $.fn.tweetLinkify = function(options) {
    $(this).each(function() {
      var tweet = TweetLinkify($(this).text(), options)
      $(this).html(tweet);
    })
  }

  $.getJSON(apiurl,function(json){
         // console.log(json);

         $.each(json.items,function(i,data){
             // html += '<p>From:"'+ data.author_id+'"</p>';
             html += '<div class="flickr-img"><a href="' + data.link + '" target="_newtab"><img src ="'
             + data.media.m + '" class="flickr-img"></a></div>'
             });
         $("#flikpics").append(html);
     });

  window.TweetLinkify = function(tweet, options) {
    var defaultAttributes = {
      excludeHyperlinks: false,
      excludeMentions: false,
      excludeHashtags: false,
      hyperlinkTarget: '',
      mentionTarget: '',
      mentionIntent: false,
      hashtagTarget: '',
      hyperlinkClass: '',
      mentionClass: '',
      hashtagClass: '',
      hyperlinkRel: '',
      mentionRel: '',
      hashtagRel: ''
    };

    var options = $.extend(defaultAttributes, options);

    var hyperlinkTarget = (options.hyperlinkTarget != '') ? 'target="_' + options.hyperlinkTarget + '"' : '';
    var mentionTarget = (options.mentionTarget != '') ? 'target="_' + options.mentionTarget + '"' : '';
    var hashtagTarget = (options.hashtagTarget != '') ? 'target="_' + options.hashtagTarget + '"' : '';
    var hyperlinkClass = (options.hyperlinkClass != '') ? 'class="' + options.hyperlinkClass + '"' : '';
    var mentionClass = (options.mentionClass != '') ? 'class="' + options.mentionClass + '"' : '';
    var hashtagClass = (options.hashtagClass != '') ? 'class="' + options.hashtagClass + '"' : '';
    var hyperlinkRel = (options.hyperlinkRel != '') ? 'rel="' + options.hyperlinkRel + '"' : '';
    var mentionRel = (options.mentionRel != '') ? 'rel="' + options.mentionRel + '"' : '';
    var hashtagRel = (options.hashtagRel != '') ? 'rel="' + options.hashtagRel + '"' : '';

    if (options.excludeHyperlinks != true) {
      tweet = tweet.replace(/(https\:\/\/|http:\/\/)([www\.]?)([^\s|<]+)/gi, '<a target="_blank" href="$1$2$3" ' + hyperlinkTarget + ' ' + hyperlinkClass + ' ' + hyperlinkRel + '>$1$2$3</a>');
      tweet = tweet.replace(/([^https\:\/\/]|[^http:\/\/]|^)(www)\.([^\s|<]+)/gi, '$1<a target="_blank" href="http://$2.$3" ' + hyperlinkTarget + ' ' + hyperlinkClass + ' ' + hyperlinkRel + '>$2.$3</a>');
      tweet = tweet.replace(/<([^a]|^\/a])([^<>]+)>/g, "&lt;$1$2&gt;").replace(/&lt;\/a&gt;/g, "</a>").replace(/<(.)>/g, "&lt;$1&gt;").replace(/\n/g, '<br />');
    }

    if (options.excludeMentions != true) {
      if (options.mentionIntent == false) {
        tweet = tweet.replace(/(@)(\w+)/g, '<a target="_blank" href="http://twitter.com/$2" ' + mentionTarget + ' ' + mentionClass + ' ' + mentionRel + '>$1$2</a>');
      } else {
        tweet = tweet.replace(/(@)(\w+)/g, '<a target="_blank" href="http://twitter.com/intent/user?screen_name=$2">$1$2</a>');
      }
    }

    if (options.excludeHashtags != true) {
      tweet = tweet.replace(/(#)(\w+)/g, '<a target="_blank" href="https://twitter.com/search/?src=hash&q=%23$2" ' + hashtagTarget + ' ' + hashtagClass + ' ' + hashtagRel + '>$1$2</a>');
    }

    return tweet;
  }



});
