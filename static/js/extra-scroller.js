$(document).ready(function() {
	var OFFSET_TOP = 150;
	var _window = $(window);
	var matches = {};
	var extraElems = $("div[id$='-extra']");
	var nextExtraIndex = 0;
	var previousScrollY = _window.scrollTop();
	var currentExtraShown = undefined;
	var highlightedDiv = undefined;
	var timeoutResize;

	var associatedDivs = $("div").filter(function() {
		return this.dataset.id !== undefined;
	});

	var isValidated = verifyMatch(extraElems, associatedDivs);
	if (isValidated) {
		matches = matchExtraWithDiv(extraElems, associatedDivs);
		
		extraElems.each(function(index, elem) {
			$(elem).css('display', 'none');
		});

		showCorrectExtraOnLoad(matches);
		$(document).on("scroll", function(e) {
			var dataId = Object.keys(matches)[nextExtraIndex];
			if (dataId) {
				var divToCheck = $("div[data-id='" + dataId + "']");

				if (_window.scrollTop() > previousScrollY) {
					if (divToCheck.offset().top - _window.scrollTop() < OFFSET_TOP && nextExtraIndex < Object.keys(matches).length) {
						showElem($(matches[dataId]), currentExtraShown, divToCheck);
						nextExtraIndex++;
						currentExtraShown = $(matches[dataId]); 
					}
				} else {
					if (_window.scrollTop() - divToCheck.offset().top < OFFSET_TOP && nextExtraIndex >= 0) {
						showElem($(matches[dataId]), currentExtraShown, divToCheck);
						nextExtraIndex--;
						currentExtraShown = $(matches[dataId]);
					}
				}

			} else if (nextExtraIndex == Object.keys(matches).length) {
				nextExtraIndex--;
			} else if (nextExtraIndex == -1) {
				nextExtraIndex++;
			}

			previousScrollY = _window.scrollTop();
		});

		$(window).on("resize", function(e) {
			clearTimeout(timeoutResize);
			if (currentExtraShown) {
				currentExtraShown.css('display', 'none');
			}

			timeoutResize = setTimeout(function() {
				redrawExtra(currentExtraShown);
			}, 500);

		});
	}

	function redrawExtra(_currentExtraShown) {
		if (_currentExtraShown) {
			showElem(_currentExtraShown, undefined, undefined);
		}
	}

	function isNewExtraToShow(_current, _new) {
		return _current == undefined || _current.data('id') !== _new.data('id');
	}

	function matchExtraWithDiv(extraElems, associatedDivs) {
		_m = {};
		for (var i=0; i<associatedDivs.length; i++) {
			_m[associatedDivs[i].dataset.id] = extraElems[i];
		}

		return _m;
	}

	function showElem(elem, _currentExtraShown, _associatedDiv) {
		if (_currentExtraShown !== undefined) {
			_currentExtraShown.css('display', 'none');
		}

		if (_associatedDiv !== undefined) {
			highlightDiv(_associatedDiv);
		}

		var containsImages = extraContainsImages(elem);
		var extraDiv = $("#extra");
		var divAtBottom = !(extraDiv.position().left > 0);

		if (containsImages) {
			resizeToFit(elem, divAtBottom);
		}

		var displayValue = getDisplayValue(containsImages, divAtBottom);
		var positionValue = getPositionValue(containsImages, divAtBottom);
		elem.css({'display' : displayValue, 'position': positionValue});
		topPosition = getVerticalPosition(elem, extraDiv);
		$(elem).css('top', topPosition);
	}

	function highlightDiv(_elem) {
		if (highlightedDiv !== undefined) {
			if (highlightedDiv !== _elem) {
				$(_elem).addClass('highlighted');
				$(highlightedDiv).removeClass('highlighted')
			}
		} else {
			$(_elem).addClass('highlighted');
		}

		highlightedDiv = _elem;
	}

	function getPositionValue(containsImages, divAtBottom) {
		return (containsImages && divAtBottom) ? 'static' : 'fixed';
	}

	function getDisplayValue(containsImages, divAtBottom) {
		if (containsImages) {
			if (divAtBottom) {
				return 'inline-flex';
			} else {
				return 'flex';
			}
		} else {
			return 'block';
		}
	}

	function getVerticalPosition(elem, extraDiv) {
		if (extraDiv.position().left > 0) {
			return $(window).height()/2 - elem.outerHeight()/2 + 'px'
		} else {
			return extraDiv.position().top + extraDiv.height()/2 - elem.outerHeight()/2 + "px";
		}
	}

	function showCorrectExtraOnLoad(_matches) {
		if ($(window).scrollTop() == 0) {
			nextExtraIndex = 0;
			return;
		}

		var closestDivId = undefined;
		var closestDiv = undefined;
		var closestDistance = Number.POSITIVE_INFINITY;
		var closestDivIndex = undefined;
		var index = 0;

		for (var _id in _matches) {
			var divToCheck = $("div[data-id='" + _id + "']");
			var below = $(window).scrollTop() - divToCheck.position().top <= 0;
			var currentDistance;
			if (below) {
				currentDistance = divToCheck.position().top - $(window).scrollTop() + 100;
			} else {
				currentDistance = $(window).scrollTop() - divToCheck.position().top + 100;
			}

			if (currentDistance < closestDistance) {
				closestDistance = currentDistance;
				closestDivId = _id;
				closestDiv = divToCheck;
				closestDivIndex = index;
			}

			index++;
		}

		var extraToShow = $(_matches[closestDivId]);
		showElem(extraToShow, undefined, closestDiv);
		currentExtraShown = extraToShow;
		nextExtraIndex = closestDivIndex;
	}

	function verifyMatch(extraElems, associatedDivs) {
		if (extraElems.length != associatedDivs.length) {
			return false;
		} else {
			for (var i=0; i<extraElems.length; i++) {
				if (extraElems[i].id.split('-extra')[0] !== associatedDivs[i].dataset.id) {
					return false;
				}
			}

			return true;
		}
	}

	function extraContainsImages(extra) {
		var firstChild = extra.children()[0];
		if (firstChild) {
			return $(firstChild).hasClass('extra-image-item');
		}

		return false;
	}

	function resizeToFit(extra, isExtraDivAtBottom) {
		var nbImages = extra.children().length;
		var viewPortHeight = $(window).height();
		var viewPortWidth = $(window).width();
		var extraWidth = $("#extra").width();
		var extraHeight = $("#extra").height();
		var heightItem;
		var widthItem;

		if (nbImages > 2) {
			if (isExtraDivAtBottom) {
				heightItem = extraHeight
				widthItem = extraWidth/nbImages;
			} else {
				heightItem = viewPortHeight/nbImages * 2 - viewPortHeight/10;
				widthItem = extraWidth/nbImages * 2;	
			}
		} else {
			if (isExtraDivAtBottom) {
				heightItem = extraHeight;
				widthItem = extraWidth/nbImages - extraWidth/4;
			} else {
				heightItem = viewPortHeight/4;
				widthItem = extraWidth - extraWidth/4;
			}
		}

		extra.children().each(function(index, item) {
			var img = $(item).children()[0];

			$(img).css({'width': widthItem,
						'height': heightItem});
		});
	}
});