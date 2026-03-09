const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

function mapRequestToOrder(body) {
  return {
    orderId: body.numeroPedido,
    value: body.valorTotal,
    creationDate: new Date(body.dataCriacao),
    items: body.items.map((item) => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem,
    })),
  };
}

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Order API running",
    status: "OK",
  });
});

router.post("/order", async (req, res) => {
  try {
    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    if (!numeroPedido || !valorTotal || !dataCriacao || !items || !Array.isArray(items)) {
      return res.status(400).json({
        error: "Dados inválidos. Verifique numeroPedido, valorTotal, dataCriacao e items.",
      });
    }

    const orderData = mapRequestToOrder(req.body);

    const existingOrder = await Order.findOne({ orderId: orderData.orderId });
    if (existingOrder) {
      return res.status(409).json({
        error: "Pedido já cadastrado.",
      });
    }

    const newOrder = new Order(orderData);
    await newOrder.save();

    return res.status(201).json({
      message: "Pedido criado com sucesso.",
      order: newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao criar pedido.",
      details: error.message,
    });
  }
});

router.get("/order/list", async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao listar pedidos.",
      details: error.message,
    });
  }
});

router.get("/order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        error: "Pedido não encontrado.",
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao buscar pedido.",
      details: error.message,
    });
  }
});

router.put("/order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderData = mapRequestToOrder(req.body);

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      orderData,
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        error: "Pedido não encontrado para atualização.",
      });
    }

    return res.status(200).json({
      message: "Pedido atualizado com sucesso.",
      order: updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao atualizar pedido.",
      details: error.message,
    });
  }
});

router.delete("/order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await Order.findOneAndDelete({ orderId });

    if (!deletedOrder) {
      return res.status(404).json({
        error: "Pedido não encontrado para exclusão.",
      });
    }

    return res.status(200).json({
      message: "Pedido deletado com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao deletar pedido.",
      details: error.message,
    });
  }
});

module.exports = router;