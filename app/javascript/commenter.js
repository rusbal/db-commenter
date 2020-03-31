$(function() {

  // Settings

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

    hilite($(this).parents('.row'))
  })

  $('.tr-column').on('click', function() {
    readMode()

    $(this)
      .find('form')
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

  $('a.foreign-links').on('click', function(evt) {
    evt.preventDefault()
    evt.stopPropagation()

    var id = $(this).attr('href')
    var dom = $('#' + id)

    if (dom.length === 0) return

    setTableAsActive(dom.parent('details'))
    dom[0].scrollIntoView()
  })

  $('.group-row').on('click', function() {
    hilite($(this))
  })
})

function readMode() {
  $('form').hide()
  $('.no-comment').show()
}

function setTableAsActive(dom) {
  dom.attr('open', true)
  hilite(dom.parents('.row'))
}

function hilite(row) {
  $('.row.hilite').removeClass('hilite')

  row.addClass('hilite')
}
