import React, { useEffect, useState } from "react";
import "./Message.css";

function Message({ userId, handleClose, userDestId }) {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [userDestIdName, setUserDestIdName] = useState("");
  const [infoDestinataire, setInfoDestinataire] = useState([]);
  const [actif, setActif] = useState(false);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3001/conversations/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Conversations récupérées: de", userId, data);
          setConversations(data);

          if (userDestId) {
            const conversation = data.find((conv) => conv.receiver_idname === userDestId);
            if (conversation) {
              handleSelectConversation(conversation.conversation_id);
              setUserDestIdName(userDestId);
              infoDest(userDestId);
            } else {
              createNewConversation(userId, userDestId);
            }
          }
        })
        .catch((error) => console.error("Erreur lors de la récupération des conversations", error));
    }
  }, [userId, userDestId]);

  const handleSelectConversation = (conversationId) => {
    fetch(`http://localhost:3001/messages/conversation/${conversationId}`)
      .then((response) => response.json())
      .then((data) => {
        setActif(true);
        setSelectedConversation({ conversation_id: conversationId, messages: data });
        console.log("Messages récupérés:", data);
      })
      .catch((error) => console.error("Erreur lors de la récupération des messages de la conversation", error));
  };

  const infoDest = (userDestIdName) => {
    fetch(`http://localhost:3001/profil/${userDestIdName}`)
      .then((response) => response.json())
      .then((data) => {
        setInfoDestinataire(data);
        console.log("Informations récupérées: de", userDestIdName, data);
      })
      .catch((error) => console.error("Erreur lors de la récupération des informations", error));
  };

  const createNewConversation = (creatorId, receiverId) => {
    fetch(`http://localhost:3001/conversations/last`)
      .then((response) => response.json())
      .then((data) => {
        const newConversationId = data.length > 0 ? data[0].conversation_id + 1 : 1;
        const newConversation = {
          conversation_id: newConversationId,
          creator_idname: creatorId,
          receiver_idname: receiverId,
          title: receiverId,
        };

        fetch(`http://localhost:3001/conversations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newConversation),
        })
        .then((response) => response.json())
        .then((data) => {
          setConversations((prev) => [...prev, newConversation]);
          handleSelectConversation(newConversationId);
          envoyerMessage(newConversationId, creatorId, receiverId, "Pouvez-vous me prêter votre outil");
        })
        .catch((error) => console.error("Erreur lors de la création de la conversation", error));
      })
      .catch((error) => console.error("Erreur lors de la récupération de la dernière conversation", error));
  };

  const envoyerMessage = (conversationId, envoyeur, destinataire, messageText) => {
    const newMessage = {
      user_idname: envoyeur,
      message: messageText,
      senderName: "Vous", // Vous pouvez changer ça selon votre besoin
    };

    // Mettre à jour immédiatement l'état avant la requête fetch
    if (selectedConversation) {
      setSelectedConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));
    }

    setMessage("");

    fetch(`http://localhost:3001/conversations/${conversationId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_idname: envoyeur,
        user_dest_idname: destinataire,
        message: messageText,
      }),
    })
    .then((response) => response.json())
    .then((newMessageFromServer) => {
      // Mettre à jour l'état avec le message provenant du serveur si nécessaire
    })
    .catch((error) => console.error("Erreur lors de l'envoi du message", error));
  };

  const resetStates = () => {
    setConversations([]);
    setSelectedConversation(null);
    setMessage("");
    setActif(false);
    setUserDestIdName("");
    setInfoDestinataire([]);
  };

  useEffect(() => {
    if (!actif) {
      resetStates();
    }
  }, [actif]);

  console.log("selectedConversation", selectedConversation);
  return (
    <div className="arriere_plan_message">
      <div className="message_container">
        <button
          id="fermeture"
          onClick={() => {
            handleClose();
            resetStates();
          }}
        >
          X
        </button> 
        <div className="colonne_conversations">
          <h2>Destinataires</h2>
          {conversations.map((conv) => (
            <h4
              className="conversation"
              key={conv.conversation_id}
              onClick={() => {
                handleSelectConversation(conv.conversation_id);
                setUserDestIdName(conv.receiver_idname);
                infoDest(conv.receiver_idname);
              }}
            >
              {conv.title}
            </h4>
          ))}
        </div>
        <div className="colonne_details">
          <h2>Conversation</h2>
          {selectedConversation &&
            selectedConversation.messages &&
            selectedConversation.messages.map((msg, index) => (
              <div key={msg.id || index}> {/* Utilisez une clé unique comme msg.id si disponible */}
                <p>
                  <strong className={msg.user_idname === userId ? "admin" : "destinataire"}>
                    {msg.message} - {msg.user_idname === userId ? "Vous" : msg.senderName}:
                  </strong>
                  <br />
                </p>
              </div>
            ))}

          {actif && (
            <>
              <textarea
                className="message_input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écrire un message"
              />
              <button
                onClick={() => {
                  if (selectedConversation && selectedConversation.messages.length > 0) {
                    const conversationId = selectedConversation.conversation_id;
                    envoyerMessage(conversationId, userId, userDestIdName, message);
                  }
                }}
              >
                Envoyer
              </button>
            </>
          )}
        </div>
        <div className="colonne_infos">
          <h2>Informations</h2>
          <div>
            {infoDestinataire.length > 0 && infoDestinataire.map((info) => (
              <p key={info.id}>
                <strong>Nom:</strong> {info.nom}
                <br />
                <br />
                <strong>Prénom:</strong> {info.prenom}
                <br />
                <br />
                <strong>Email:</strong> {info.email}
                <br />
                <br />
                <strong>Nombre d'annonces:</strong> {info.nbAnnonces}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
