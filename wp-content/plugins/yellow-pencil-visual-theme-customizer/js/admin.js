! function(t) {
    "use strict";
    t(document).ready(function() {
        t(document).on("click", ".yp-btn,.yp-btn-bottom", function() {
            if ("pending" == t("#hidden_post_status").val() || "draft" == t("#hidden_post_status").val() || "publish" == t("#hidden_post_status").val()) {
                var n = t("#view-post-btn").find("a").attr("href"),
                    e = t("#post_ID").val();
                n = "admin.php?page=yellow-pencil-editor&href=" + encodeURIComponent(n) + "&yp_id=" + e, t(this).hasClass("yp-btn-bottom") ? (n = n.split("&yp_id"), window.open(n[0] + "&yp_type=" + typenow, "_blank")) : window.open(n, "_blank")
            } else alert("Please save this post as draft or publish.")
        }), 0 == t("body").hasClass("post-type-attachment") && t("#postbox-container-1").length > 0 && (t("#postbox-container-1").prepend("<a class='yp-btn-bottom'>OR <small>EDIT ALL SINGLE " + typenow + "S</small></a>"), t("#postbox-container-1").prepend("<a class='yp-btn'><small>Edit page -</small> Yellow Pencil</a>"))
    })
}(jQuery);