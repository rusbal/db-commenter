$(function() {
  $('#showAll').on('click', function() {
    if ($(this).is(':checked')) {
      $('tr.hidden-column').show()
    } else {
      $('tr.hidden-column').hide()
    }
  })

  $('#showForeignId').on('click', function() {
    if ($(this).is(':checked')) {
      $('tr.foreign-id').show()
    } else {
      $('tr.foreign-id').hide()
    }
  })

  $('#expandAll').on('click', function() {
    if ($(this).is(':checked')) {
      $('details').attr('open', true)
    } else {
      $('details').removeAttr('open')
    }
  })

  $('summary').on('click', function() {
    $(this).blur()
  })

  $('.no-comment').on('click', function() {
    readMode()

    $(this)
      .hide()
      .next('form')
        .show()
        .find('textarea.form-control').focus()
  })

  $('textarea.form-control')
    .keyup(function (e) {
      var code = (e.keyCode ? e.keyCode : e.which)
      if (code === 27) {
        $(this).closest('form').trigger('reset')
        readMode()
        return true
      }
    })
    .keypress(function (e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if (code === 13) {
        $(this).closest('form').submit()
        return true
      }
    })

  function readMode() {
    $('form').hide()
    $('.no-comment').show()
  }

  $('a.foreign-links').on('click', function(evt) {
    evt.preventDefault()

    var id = $(this).attr('href')
    var dom = $('#' + id)

    if (dom.length === 0) return

    dom.parent('details').attr('open', true)
    dom[0].scrollIntoView()
  })
})
