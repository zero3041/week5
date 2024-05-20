define([
    'jquery',
    'Magento_Ui/js/modal/alert',
    'mage/validation'
], function ($, alert) {
    'use strict';

    $.widget('bss.customWidget', {
        options: {
            formSelector: '#fresher-form'
        },

        _create: function () {
            this._super();
            this._bindEvents();
        },

        _bindEvents: function () {
            var self = this,
                submitBtn = self.element.find('#submitBtn');

            submitBtn.on('click', function (e) {
                e.preventDefault();
                self._submitForm();
            });
        },

        _submitForm: function () {
            var name = this.element.find('#name').val(),
                telephone = this.element.find('#telephone').val(),
                dob = this.element.find('#dob').val(),
                message = this.element.find('#message').val(),
                self = this;

            if (this._validateForm()) {
                $.ajax({
                    url: '/bss/fresher/submit',
                    type: 'POST',
                    data: { name: name, telephone: telephone, dob: dob, message: message },
                    dataType: 'json',
                    success: function (response) {
                        if (response.success) {
                            self._showSuccessPopup(response.data);
                        } else {
                            self._showErrorPopup(response.message);
                        }
                    },
                    error: function () {
                        self._showErrorPopup('Error.');
                    }
                });
            }
        },

        _validateForm: function () {
            var name = this.element.find('#name').val(),
                telephone = this.element.find('#telephone').val(),
                dob = this.element.find('#dob').val(),
                message = this.element.find('#message').val(),
                isValid = true,
                errorShown = false;

            if (name.trim() === '') {
                isValid = false;
                this._showAlert('Please enter your name.', 'error');
                errorShown = true;
            }

            if (telephone.trim() === '') {
                isValid = false;
                if (!errorShown) {
                    this._showAlert('Please enter your telephone number.', 'error');
                    errorShown = true;
                }
            }

            if (!telephone.match(/^\d{10}$/)) {
                isValid = false;
                if (!errorShown) {
                    this._showAlert('Please Phone number must have 10 digits', 'error');
                    errorShown = true;
                }
            }

            if (dob.trim() === '') {
                isValid = false;
                if (!errorShown) {
                    this._showAlert('Please enter your date of birth.', 'error');
                    errorShown = true;
                }
            }

            if (message.trim() === '') {
                isValid = false;
                if (!errorShown) {
                    this._showAlert('Please enter your message.', 'error');
                    errorShown = true;
                }
            }

            return isValid;
        },

        _showAlert: function (message, title) {
            alert({
                title: title,
                content: message
            });
        },

        _showValidationError: function () {
            alert({
                title: 'Validation Error',
                content: 'Please fill in all required fields with valid data.'
            });
        },

        _showSuccessPopup: function (data) {
            var message = '<h3>Name: ' + data.name + '\n' + '</h3>' +
                '<h3>Telephone: ' + data.telephone + '\n' + '</h3>' +
                '<h3>Date of Birth: ' + data.dob + '\n' + '</h3>' +
                '<h3>Message: ' + data.message + '</h3>';

            this._showAlert(message, 'Success');

        },

        _showErrorPopup: function (message) {
            this._showAlert(message, 'Error');
        }
    });

    return $.bss.customWidget;
});
