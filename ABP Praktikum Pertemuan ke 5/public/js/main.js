/* ============================================
   STUDENT MANAGEMENT SYSTEM - MAIN JS
   jQuery + jQuery Plugins + DataTable
   ============================================ */

// ====== GLOBAL UTILITIES ======

// Toast notification plugin (jQuery plugin)
$.fn.showToast = function(options) {
  const defaults = { type: 'success', title: 'Berhasil', message: '', duration: 3500 };
  const opts = $.extend({}, defaults, options);

  const icons = { success: 'bi-check-circle-fill', error: 'bi-x-circle-fill', warning: 'bi-exclamation-triangle-fill', info: 'bi-info-circle-fill' };
  const colors = { success: '#0e9f6e', error: '#e02424', warning: '#d97706', info: '#1a56db' };

  const id = 'toast-' + Date.now();
  const html = `
    <div id="${id}" class="toast-custom mb-2 animate-in" style="border-left: 4px solid ${colors[opts.type]}">
      <span class="toast-icon" style="color:${colors[opts.type]}"><i class="bi ${icons[opts.type]}"></i></span>
      <div>
        <div class="toast-msg">${opts.title}</div>
        ${opts.message ? `<div class="toast-sub">${opts.message}</div>` : ''}
      </div>
      <button onclick="$('#${id}').remove()" class="ms-auto btn-close btn-close-sm" style="font-size:11px"></button>
    </div>`;

  $('#toast-container').prepend(html);
  setTimeout(() => $(`#${id}`).fadeOut(400, function() { $(this).remove(); }), opts.duration);
};

// Number counter animation (jQuery plugin)
$.fn.countUp = function(target, duration) {
  const $el = $(this);
  $({ counter: 0 }).animate({ counter: target }, {
    duration: duration || 1200,
    easing: 'swing',
    step: function() { $el.text(Math.ceil(this.counter)); }
  });
};

// ====== SIDEBAR TOGGLE ======
$(document).ready(function() {
  // Create overlay if not exists
  if (!$('.sidebar-overlay').length) {
    $('body').append('<div class="sidebar-overlay"></div>');
  }

  // Burger menu toggle
  $('#menuToggle').on('click', function() {
    $('.sidebar').toggleClass('open');
    $('.sidebar-overlay').toggleClass('show');
  });

  $('.sidebar-overlay').on('click', function() {
    $('.sidebar').removeClass('open');
    $(this).removeClass('show');
  });

  // Mark active link
  const currentPath = window.location.pathname;
  $('.sidebar-link').each(function() {
    const href = $(this).attr('href');
    if (href === currentPath || (currentPath === '/' && href === '/')) {
      $(this).addClass('active');
    } else if (href !== '/' && currentPath.startsWith(href)) {
      $(this).addClass('active');
    }
  });

  // Smooth transitions on all panels
  $('.panel, .stat-card').each(function(i) {
    $(this).addClass('animate-in').css('animation-delay', (i * 0.06) + 's');
  });
});

// ====== FORMAT UTILITIES ======
function getIPKClass(ipk) {
  if (ipk >= 3.75) return 'ipk-excellent';
  if (ipk >= 3.00) return 'ipk-good';
  if (ipk >= 2.50) return 'ipk-average';
  return 'ipk-low';
}

function getIPKLabel(ipk) {
  if (ipk >= 3.75) return 'Cumlaude';
  if (ipk >= 3.00) return 'Sangat Memuaskan';
  if (ipk >= 2.50) return 'Memuaskan';
  return 'Cukup';
}

function getStatusBadge(status) {
  const badges = {
    'Aktif': 'badge-aktif',
    'Cuti': 'badge-cuti',
    'Lulus': 'badge-lulus'
  };
  return `<span class="badge-status ${badges[status] || 'badge-aktif'}">${status}</span>`;
}

function getInitials(nama) {
  return nama.split(' ').slice(0,2).map(n => n[0]).join('').toUpperCase();
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ====== CONFIRM DIALOG (jQuery plugin) ======
$.fn.confirmDelete = function(nama, onConfirm) {
  $('#confirmModal .confirm-name').text(nama);
  $('#confirmModal').modal('show');
  $('#btnConfirmDelete').off('click').on('click', function() {
    $('#confirmModal').modal('hide');
    onConfirm();
  });
};
