```mermaid
graph TB
    A["Device 1 (Bike) fa:fa-bicycle"]
    A1[Arduino]
    A2[Ecran fa:fa-desktop]
    B["Device 2 (weights)"]
    B1[Arduino]
    B2[Screen fa:fa-desktop]
    A2[Screen fa:fa-desktop]
    D[Phone fa:fa-mobile]
    E[Server fa:fa-server]
    
    F[Machine Cocktailfa:fa-cocktail]
  	G[Arduino]
  	H[Screen fa:fa-desktop]
  	I[Camera fa:fa-camera]
  	subgraph Device 1
    A -->|1| A1
    A1 -->|2| A2
    end
    A2 -.->|3|D
   	
   	subgraph Device 2 
    B -->|1| B1
    B1 -->|2| B2
    end
    
    B2 -.->|3|D 
    D -->|4| E
	E -.->|5| D
	D -->|6| I
	
	subgraph Cocktail device
	G -->|8| F
	G --> H
	I -->|7| G
	end
	
    
```

1. L'appareil envoie les informations énergétiques à l'Arduino

2. L'Arduino process les données et affiche le score + un **code** sur l'écran

3. L'utilisateur rentre le **code** sur notre site, à partir de son téléphone
   Un code contient les informations suivantes :

   | 1                                          | 2                                       | 3     |
   | ------------------------------------------ | --------------------------------------- | ----- |
   | Identifiant de la machine (Bike ou Weight) | Identifiant de la commande (nième code) | score |

4. Le code est envoyé sur le serveur

5. Le serveur vérifie le code.  On aura une valeur initialisée à 0 dans la base de données ,pour chacun des appareils. Un code est valide si son identifiant de commande correspond à la valeur à incrémenter, pour l'appareil en question. Si le code est valide, on affiche la liste des sirops en fonction du score et incrémente la valeur

6. L'utilisateur clique sur le produit qu'il désire. Un QR Code s'affiche. Il le montre à la caméra de la machine à cocktail

7. L'Arduino de la machine à cocktail vérifie le code (de la même manière qu'au point 5)

8. Si le code est valide, la machine effectue le sirop demandé