class Swipe {
    constructor(element) {
        this.xDown = null;
        this.yDown = null;
        this.element = typeof (element) === 'string' ? document.querySelector(element) : element;

        this.element.addEventListener('touchstart', function (evt) {
            this.xDown = evt.touches[0].clientX;
            this.yDown = evt.touches[0].clientY;
        }.bind(this), false);

    }

    onLeft(callback) {
        this.onLeft = callback;

        return this;
    }

    onRight(callback) {
        this.onRight = callback;

        return this;
    }

    onUp(callback) {
        this.onUp = callback;

        return this;
    }

    onDown(callback) {
        this.onDown = callback;

        return this;
    }

    handleTouchMove(evt) {
        if (!this.xDown || !this.yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;

        if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) { // Most significant.
            if (this.xDiff < -10) {
                if (this.onLeft != "undefined" && (typeof this.onLeft != undefined)) this.onLeft();

            } else if (this.xDiff > 10) {
                if (this.onRight != "undefined" && (typeof this.onRight != undefined)) this.onRight();
            }
        } else {
            if (this.yDiff > 10) {
                if (this.onUp != "undefined" && (typeof this.onUp != undefined)) this.onUp();
            } else if (this.yDiff < -10) {
                if (this.onDown != "undefined" && (typeof this.onDown != undefined)) this.onDown();
            }
        }

        // Reset values.
        this.xDown = null;
        this.yDown = null;
    }

    run() {
        this.element.addEventListener('touchmove', function (evt) {
            this.handleTouchMove(evt);
        }.bind(this), false);
    }
}


//JS Cho thao tác vuốt màn hình
//Có 4 thao tác Vuốt Trái , Phải , Lên , Xuống (onLeft,onRight,onUp,onDown)
//var swiper = new Swipe('.view-session-detail');
//swiper.onLeft(function () {
//    let parent = $(this.element).closest(".view-session")
//    parent.removeClass("active");
//});
//swiper.run();

//$(".master-group-item").on("click", function () {
//    let _title = $(this).attr("data-title");
//    let _master = $(this).closest(".view-session");
//    _master.toggleClass("active");
//    _master.find(".card-header-title").html(_title);
//})
//$(".view-back-master").on("click", function () {
//    let _master_detail = $(this).closest(".view-session");
//    _master_detail.removeClass("active");
//})
