$clients = @(
    @{ name="elecart__in"; url="https://www.instagram.com/elecart__in/" },
    @{ name="aljaradbakery"; url="https://www.instagram.com/aljaradbakery/" },
    @{ name="mbckuttikanam"; url="https://www.instagram.com/mbckuttikanam/" },
    @{ name="eurokids_thrikkakara"; url="https://www.instagram.com/eurokids_thrikkakara/" },
    @{ name="_onestep.fit"; url="https://www.instagram.com/_onestep.fit/" },
    @{ name="thenali_tales_official"; url="https://www.instagram.com/thenali_tales_official/" },
    @{ name="red_spices_chettukuzhy"; url="https://www.instagram.com/red_spices_chettukuzhy/" },
    @{ name="avios_academy"; url="https://www.instagram.com/avios_academy/" },
    @{ name="balyampreschool"; url="https://www.instagram.com/balyampreschool/" },
    @{ name="equihaul_enterprise"; url="https://www.instagram.com/equihaul_enterprise/" },
    @{ name="_royal_trading_corporation"; url="https://www.instagram.com/_royal_trading_corporation/" },
    @{ name="rayenna_energy"; url="https://www.instagram.com/rayenna_energy/" },
    @{ name="athiraghosh_the_make_up_artist"; url="https://www.instagram.com/athiraghosh_the_make_up_artist/" },
    @{ name="mentallye.official"; url="https://www.instagram.com/mentallye.official/" },
    @{ name="abkagro"; url="https://www.instagram.com/abkagro/" },
    @{ name="emirates_travel_link"; url="https://www.instagram.com/emirates_travel_link/" }
)

New-Item -ItemType Directory -Force -Path "images\clients"

foreach ($client in $clients) {
    Write-Host "Fetching $($client.name)..."
    try {
        $response = Invoke-WebRequest -Uri $client.url -UseBasicParsing -TimeoutSec 15
        if ($response.Content -match 'property="og:image" content="(.*?)"') {
            $imgUrl = $matches[1] -replace '&amp;', '&'
            # Write-Host "Found image for $($client.name): $imgUrl"
            Invoke-WebRequest -Uri $imgUrl -OutFile "images\clients\$($client.name).jpg"
            Write-Host "Saved $($client.name).jpg"
        } else {
            Write-Host "No og:image found for $($client.name)"
        }
    } catch {
        Write-Host "Failed to fetch $($client.name): $_"
    }
}
