
var welcomeView =
`<div class="welcome-court-container">
    <h3>Welcome!</h3>
    <p>To create a new court, just click on the map.</p>
    <p>To view details for a court, select the court.</p>
</div>`;

var courtDetailView = `<p>${court.name}</p><p>${court.description}</p>`;

var createCourtView =
`<div class="create-court-container">
                    <form class="create-court" action="/courts" method="POST" enctype="multipart/form-data">
                        
                        <div id="create-court-header">
                            <h3>Create a new court</h3>
                            <p id="create-court-close">CLOSE</p>
                        </div>
                        
                        <span>
                            <label for="name">Court name:</label>
                            <input type="text" name="name" placeholder="Name" required="true">
                        </span>

                        <input type="hidden" name="long" id="long" >
                        <input type="hidden" name="lat" id="lat">

                        <span>
                            <label for="fulltime">Open fulltime:</label>
                            <input checked={isFulltime} type="checkbox" id="fulltime" name="fulltime" onclick="toggleOpeningTimes()">
                        </span>
                        
                        <span>
                            <label for="opening">Opening hour:</label>
                            <select name="opening" id="opening">
                                <option value="0">00:00</option>
                                <option value="1">01:00</option>
                                <option value="2">02:00</option>
                                <option value="3">03:00</option>
                                <option value="4">04:00</option>
                                <option value="5">05:00</option>
                                <option value="6">06:00</option>
                                <option value="7">07:00</option>
                                <option value="8">08:00</option>
                                <option value="9">09:00</option>
                                <option value="10">10:00</option>
                                <option value="11">11:00</option>
                                <option value="12">12:00</option>
                                <option value="13">13:00</option>
                                <option value="14">14:00</option>
                                <option value="15">15:00</option>
                                <option value="16">16:00</option>
                                <option value="17">17:00</option>
                                <option value="18">18:00</option>
                                <option value="19">19:00</option>
                                <option value="20">20:00</option>
                                <option value="21">21:00</option>
                                <option value="22">22:00</option>
                                <option value="23">23:00</option>
                            </select>

                            <label class="create-court-col-2" for="closing">Closing hour:</label>
                            <select name="closing" id="closing">
                                <option value="0">00:00</option>
                                <option value="1">01:00</option>
                                <option value="2">02:00</option>
                                <option value="3">03:00</option>
                                <option value="4">04:00</option>
                                <option value="5">05:00</option>
                                <option value="6">06:00</option>
                                <option value="7">07:00</option>
                                <option value="8">08:00</option>
                                <option value="9">09:00</option>
                                <option value="10">10:00</option>
                                <option value="11">11:00</option>
                                <option value="12">12:00</option>
                                <option value="13">13:00</option>
                                <option value="14">14:00</option>
                                <option value="15">15:00</option>
                                <option value="16">16:00</option>
                                <option value="17">17:00</option>
                                <option value="18">18:00</option>
                                <option value="19">19:00</option>
                                <option value="20">20:00</option>
                                <option value="21">21:00</option>
                                <option value="22">22:00</option>
                                <option value="23">23:00</option>
                                <option value="24">24:00</option>
                            </select>
                        </span>

                        <span>
                            <label for="surface">Court type:</label>
                            <select name="surface" id="surface">
                                <option value="rubber">rubber</option>
                                <option value="concrete">concrete</option>
                                <option value="other">other</option>
                            </select>

                            <label class="create-court-col-2" for="basketType">Basket type:</label>
                            <select name="basketType" id="basketType">
                                <option value="rope">rope</option>
                                <option value="chain">chain</option>
                                <option value="other">other</option>
                            </select>
                        </span>

                        <span>
                            <label for="numBaskets">Number of baskets:</label>
                            <input id="numBaskets" type="number" name="numBaskets" min="1" max="10" required="true">

                            <label class="create-court-col-2" for="lighting">Lighting:</label>
                            <input checked={isLighting} type="checkbox" id="lighting" name="lighting">
                        </span>

                        <span>
                            <label for="description">Description:</label>
                            <textarea name="description" cols="36" rows="2"></textarea>
                        </span>

                        <span>
                            <label for="court-picture">Court picture:</label>
	                        <input type="file" name="court-picture" title=" "/> 
                        </span>


                        <div class="create-court-button-container">
                            <button type="submit">Add new court</button>
                        </div>
                        
                    </form>
                </div>`;