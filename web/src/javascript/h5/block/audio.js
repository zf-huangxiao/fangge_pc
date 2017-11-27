$(document).ready(function () {
    var $audio_boxes = $('.my_article_audio'),
        $audio = $audio_boxes.find('audio'),
        $play = $audio_boxes.find('.play_btn');

    $audio_boxes.find('.control').prepend('<div class="pause" style="display:none"></div>');
    var $pause = $audio_boxes.find('.pause');
    $play.on('click', function () {
        $(this).hide();
        $(this).siblings('.pause').show();
        $(this).parent().parent().find('audio')[0].play();
        $(this).siblings('.audio_jump').addClass('jumping');
    });
    $pause.on('click', function () {
        $(this).hide();
        $(this).siblings('.play_btn').show();
        $(this).parent().parent().find('audio')[0].pause();
        $(this).siblings('.audio_jump').removeClass('jumping');
    });
    $audio.each(function (index, cur) {
        cur.onpause = function () {
            $(this).siblings('.control').find('.pause').hide();
            $(this).siblings('.control').find('.play_btn').show();
            $(this).siblings('.control').find('.audio_jump').removeClass('jumping');
        }
    })
});

