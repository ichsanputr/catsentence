<script setup>
useHead({
    title: 'How To Play Fillme'
});
</script>

<template>
    <div>
        <div class="text-base mt-3 ci flex flex-col gap-4">
            <div>
                <h1 class="mb-8">How To Play Fillme</h1>
                <p class="mt-3">This is a page that contains several points of information about how you can play
                    Fillme. We always update this tutorial when we make changes to the system or rules of this game.</p>
                <p class="mt-3 italic">Last updated: April 4, 2025</p>
            </div>

            <!-- Table of Contents -->
            <div class="border-l-4 pl-3" style="border-left: 2px solid #27548A;">
                <h2 style="margin-top: 0 !important;font-size: 16px">Table of Contents</h2>
                <ul class="list-disc text-sm">
                    <li><a href="#submit-sentence">Submit Sentence</a></li>
                    <li><a href="#complete-sentence">Complete Sentence</a></li>
                    <li><a href="#result">Result</a></li>
                    <li><a href="#report-sentence">Report Sentence</a></li>
                    <li><a href="#change-languange">Change Languange</a></li>
                    <li><a href="#leaderboard">Leaderboard</a></li>
                </ul>
            </div>

            <div id="submit-sentence">
                <h2 class="mb-2">Submit Sentence</h2>
                <p>On this platform, you can fill in the blanks in sentences created by us, and you can also freely
                    submit sentences that you create yourself. To do so, you must fill in certain fields in our form,
                    allowing us to determine the type, question, and position of the blank in the sentence you submit.
                </p>

                <p>Currently, we provide four input fields for submitting a sentence:</p>

                <ul class="list-disc mt-4">
                    <li>Language - determine your language of sentence</li>
                    <li>Kind category - can be story, news, conversation, quotes, or all</li>
                    <li>Length category - automatically determine from system based on your sentence language.</li>
                    <li>Question words - select your words which will be blank.</li>
                </ul>
            </div>

            <div id="complete-sentence">
                <h2 class="mb-2">Complete Sentence</h2>
                <p>To complete a sentence you have to type each character correctly, whether the word has been given or
                    is included in the blank question. If you have successfully typed all the characters correctly, you
                    will be automatically redirected to the results page.
                </p>

                <v-img class="my-6"
                    src="https://ik.imagekit.io/uvma3bkbp/image_nJbXMgvJ-.png?updatedAt=1743508349371"></v-img>

                <p>For every wrong character you will be given a red color on the character you typed. In the top left
                    corner is the number of words and phrases you have to complete, and next to it is the time that has
                    passed since you first typed.</p>

                <p>
                    If the number of words you wrote is the same as the number of words available, then it is considered
                    to have completed the sentence and you will be redirected to the results page.
                </p>
            </div>

            <div id="result">
                <h2 class="mb-2">Result</h2>
                <p>There is some information that we provide on the results page, I can divide this into 2 important
                    parts, namely information about the words you are working on and secondly, several action buttons.
                </p>

                <v-img class="my-6"
                    src="https://ik.imagekit.io/uvma3bkbp/image_fBQuO06fe.png?updatedAt=1743560735913"></v-img>

                <p>For every wrong character you will be given a red color on the character you typed. In the top left
                    corner is the number of words and phrases you have to complete, and next to it is the time that has
                    passed since you first typed.</p>

                <p>
                    We currently provide 4 pieces of information about the word you are working on.
                </p>

                <ul class="list-disc mt-4">
                    <li>Time - the time you spend on the sentence</li>
                    <li>Wrong type - the number of characters you make mistakes where for each wrong character you
                        will get a red status on that character and at that time the number of wrong characters will
                        increase</li>
                    <li>Sentence type - some list information about the type of sentence you are working on</li>
                    <li>Sentence - In the middle we provide the sentence along with several words that are made blank
                        by us giving it a bold style so that you can review or study it</li>
                </ul>

                <p>
                    Below it there are 3 buttons, namely.
                </p>

                <ul class="list-disc mt-4">
                    <li>Report sentence - you can report the sentence if the answer does not match the actual</li>
                    <li>New sentence - continue to work on a new sentence</li>
                    <li>Save result - save information and results about the sentences you work on</li>
                </ul>
            </div>

            <div id="report-sentence">
                <h2 class="mb-2">Report Sentence</h2>
                <p>If the sentence you are working on contains inappropriate words, or blank words that do not connect
                    with the rest of the sentence, you can report the sentence by clicking the report sentence button.
                </p>

                <p>
                    After you report it, our system will record the total number of reports on that sentence, we will
                    look at the sentences that are reported the most and then we will determine whether the sentence is
                    worthy of being deleted or not.
                </p>
            </div>

            <div id="change-languange">
                <h2 class="mb-2">Change Languange</h2>
                <p>Currently, the fillme catsentence platform supports 3 languages, namely English, Indonesian, and
                    Spanish. You can switch from one language to another using the change language modal and the select
                    option.
                </p>

                <v-img class="my-4"
                    src="https://ik.imagekit.io/uvma3bkbp/image_Lp4ErTT2O.png?updatedAt=1743562676049"></v-img>

                <p>These three languages ​​will be grouped into 1 for the leaderboard.</p>
            </div>

            <div id="leaderboard">
                <h2 class="mb-2">Leaderboard</h2>
                <p>Every result you save will be recorded as a point on your account and it will be recorded on the
                    leaderboard. We have 3 types of category lengths, short, medium, and long, where each category has
                    its own value capacity.
                </p>

                <p>The maximum value of each category duration is as follows.</p>

                <ul class="list-disc mt-4">
                    <li>Short - 30pts</li>
                    <li>Medium - 60pts</li>
                    <li>Long - 90pts</li>
                </ul>

                <p>
                    For every second that passes, your points will be <span class="italic font-semibold">reduced by 1
                        point</span>, for example, if you work on a
                    long type question and within 30 seconds, you will get <span class="italic font-semibold">90 - 30 =
                        70pts</span>.
                </p>

                <p>And also remember for every wrong character your points will be reduced by 2 points. So the point
                    calculation will be like this if you do a medium sentence with 15 seconds and get it wrong 3 times.
                </p>

                <p>Max score for medium sentence is 60 decreased by 15 then decreased again with 3*2 = <span
                        class="italic font-semibold">39pts</span></p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.gh {
    font-family: "Dekko", cursive;
}

.ci {
    color: rgb(51, 65, 85);
}

.jk {
    box-shadow: rgb(204, 219, 232) 1px 1px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
}

h2 {
    font-size: 20px;
    margin-top: 1rem;
    color: #00AA45;
}

h1 {
    font-size: 24px;
    margin-top: 1rem;
    color: #00AA45;
}

p {
    margin-top: 16px;
}

ul {
    list-style-type: disc;
    /* Ensures bullet points */
    padding-left: 20px;
    /* Adds spacing for indentation */
}
</style>